import React, { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    getGames,
    getUser,
    getUserPredictions,
    logInWithEmailAndPassword,
    logout,
    savePredictionInFirebase,
    updatePredictionInFirebase,
} from "../firebase/api";
import { auth } from "../firebase/firebase_connection";
import {
    IGameResponse,
    IGames,
    IUser,
    IUserPredictionSaved,
} from "../interfaces/interfaces";

export const AppCtx = createContext({});

interface Props {
    children: React.ReactNode;
}

export const ProdeContext = ({ children }: Props) => {
    const [user, loading] = useAuthState(auth);
    const [userData, setUserData] = useState<IUser | null>(null);
    const [userPredictions, setUserPredictions] = useState<
        IUserPredictionSaved[] | []
    >([]);
    const [showNavBar, setShowNavBar] = useState<boolean>(true);
    const [showFooter, setshowFooter] = useState<boolean>(true);
    const [qatarGames, setQatarGames] = useState<IGames[] | []>([]);

    const savePrediction = async (data: IGameResponse): Promise<boolean> => {
        try {
            await savePredictionInFirebase(data);

            saveUserPredictions(await getUserPredictions(user?.uid));

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const setShowNavBarAndFooter = async (
        show: boolean
    ): Promise<void> => {
        setshowFooter(show);
        setShowNavBar(show);
    };

    const getUserDataFromLocalStorage = async (): Promise<void> => {
        if (!user) {
            return;
        }

        if (localStorage.getItem("userData")) {
            return setUserData(JSON.parse(localStorage.getItem("userData") || ""));
        }

        saveUserData(await getUser(user.uid));
    };

    const saveUserData = async (user: IUser | null): Promise<void> => {
        localStorage.setItem("userData", JSON.stringify(user));
        setUserData(user);
    };

    const logInUser = async (
        email: string,
        password: string
    ): Promise<boolean> => {
        try {
            const user_id = await logInWithEmailAndPassword(email, password);

            saveUserData(await getUser(user_id));
            saveUserPredictions(await getUserPredictions(user_id));

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logOutUser = async (): Promise<void> => {
        await unsetUserData();
        await unsetUserPredictions();
        await logout();
    };

    const unsetUserData = async (): Promise<void> => {
        localStorage.removeItem("userData");
        setUserData(null);
    };

    const unsetUserPredictions = async (): Promise<void> => {
        setUserPredictions([]);
    };

    const getUserPredictionsFromLocalFirebase = async (): Promise<void> => {
        if (!user) {
            return;
        }

        saveUserPredictions(await getUserPredictions(user.uid));
    };

    const saveUserPredictions = async (
        predictions: IUserPredictionSaved[] | []
    ): Promise<void> => {
        setUserPredictions(predictions);
    };

    const updateUserPrediction = async (
        prediction: IUserPredictionSaved
    ): Promise<boolean> => {
        try {
            if (!user) {
                return false;
            }

            await updatePredictionInFirebase(prediction);

            const predictions = userPredictions.map((object) => {
                if (object.prediction_id === prediction.prediction_id) {
                    return prediction;
                }
                return object;
            });

            saveUserPredictions(predictions);

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const getGamesFromFirebase = async (): Promise<void> => {
        setQatarGames(await getGames());
    };

    const getGamesByDate = async (date: string | undefined): Promise<IGames[] | []> => {
        const games = qatarGames.filter((game) => game.date === date);

        return games;
    };

    useEffect(() => {
        getUserDataFromLocalStorage();
        getUserPredictionsFromLocalFirebase();
        getGamesFromFirebase();
    }, [loading]);

    return (
        <AppCtx.Provider
            value={{
                userData,
                userPredictions,
                logInUser,
                logOutUser,
                savePrediction,
                updateUserPrediction,
                showNavBar,
                showFooter,
                setShowNavBarAndFooter,
                qatarGames,
                getGamesByDate
            }}
        >
            {children}
        </AppCtx.Provider>
    );
};

export default ProdeContext;
