import { IUser, IGameResponse } from '../interfaces/interfaces';

export type ProdeContextType = {
    userData: IUser;
    logInUser: (email: string, password: string) => Promise<boolean>;
    logOutUser: () => Promise<void>;
    showNavBar: boolean;
    unsetUserData: () => Promise<void>;
    savePrediction: (data: IGameResponse) => Promise<boolean>;
    handleSetShowNavBar: (showNavBarProp: boolean) => Promise<void>;
}





/* export type ProdeContextType = {
    account: string,
    balance: string,
    games: Array<object>,
    setPrediction: (flightIndex: number, prediction: string) => Promise<any>,
    userResults: Array<object>,
    refundableEther: string,
    redeemLoyaltyPoints: () => Promise<any>
} */