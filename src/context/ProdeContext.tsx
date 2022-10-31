import React, { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {getUser, logInWithEmailAndPassword, logout} from '../firebase/api';
import { auth } from "../firebase/firebase_connection";
import { IGameResponse, IUser } from "../interfaces/interfaces";

export const AppCtx = createContext({});

interface Props {
    children: React.ReactNode;
}

export const ProdeContext = ({ children }: Props) => {
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState<IUser | null>(null);
    const [showNavBar, setShowNavBar] = useState<boolean>(true);

    const savePrediction = async (data: IGameResponse): Promise<boolean> => {
        return false;
    };

    
    const handleSetShowNavBar = async (
        showNavBarProp: boolean
    ): Promise<void> => {
        setShowNavBar(showNavBarProp);
    };

    const getUserDataFromLocalStorage = async (): Promise<void> => {
        if (!user) {
            return;
        }

        if (localStorage.getItem('userData')) {
            setUserData(JSON.parse(localStorage.getItem('userData') || ''));
        }

        saveUserData(await getUser(user.uid));

    };
    
    const saveUserData = async (user:IUser | null): Promise<void> => {
        localStorage.setItem('userData', JSON.stringify(user));
        setUserData(user);
    }

    const logInUser = async (email:string, password:string): Promise<boolean> => {
        try {
            
            const user_id = await logInWithEmailAndPassword(email, password);

            saveUserData(await getUser(user_id));

            return true;

        } catch (error) {
            console.error(error);
            return false
        }
    }

    const logOutUser = async (): Promise <void> => {
        await unsetUserData();
        await logout();
    }

    const unsetUserData = async (): Promise<void> => {
        localStorage.removeItem('userData');
        setUserData(null);
    };

    useEffect(() => {
        if(loading) return;

        getUserDataFromLocalStorage();
    }, [user, loading])
    

    return (
        <AppCtx.Provider
            value={{
                userData,
                logInUser,
                logOutUser,
                savePrediction,
                showNavBar,
                handleSetShowNavBar
            }}
        >
            {children}
        </AppCtx.Provider>
    );
};

export default ProdeContext;
