import { IUser, IGameResponse, IUserPredictionSaved, IGames, IUserWithPoints } from '../interfaces/interfaces';

export type ProdeContextType = {
    userData: IUser;
    userPredictions: IUserPredictionSaved[];
    logInUser: (email: string, password: string) => Promise<boolean>;
    logOutUser: () => Promise<void>;
    showNavBar: boolean;
    showFooter: boolean;
    unsetUserData: () => Promise<void>;
    savePrediction: (data: IGameResponse) => Promise<boolean>;
    updateUserPrediction: (prediction: IUserPredictionSaved) => Promise<boolean>;
    setShowNavBarAndFooter: (showNavBarProp: boolean) => Promise<void>;
    qatarGames: IGames[];
    getGamesByDate: (date: string) => Promise<IGames[] | []>;
    getUsersWithPoints: () => Promise<IUserWithPoints[] | []>;
    setUserPredictionPoints: (prediction_id: string, points: number) => Promise<void>;
    setGameStatus: (game_id: string, status: string) => Promise<void>;
}