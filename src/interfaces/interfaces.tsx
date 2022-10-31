export interface IUserPrediction {
    local_score: string;
    visitor_score: string;
    result: string;
}

export interface IGameResponse {
    user_id: string;
    game_id: string;
    result: IUserPrediction;
}

export interface IUserPredictionSaved {
    local_score: string;
    visitor_score: string;
    result: string;
    game_id: string;
}

export interface IFirebaseDate {
    seconds: number;
    nanoseconds: number;
}

export interface IGames {
    id: string,
    local: string;
    local_score: string;
    local_code: string;
    visitor: string;
    visitor_score: string;
    visitor_code: string;
    status: string;
    final_result: string;
    date: IFirebaseDate
}

export interface IUser {
    id: string,
    email: string,
    name: string
}

export interface IFormErrors {
    name: boolean;
    email: boolean;
    password: boolean;
    confirm_password: boolean;
}

export interface ISignInFormErrors {
    email: boolean;
    password: boolean;
}

export interface IProtectedRouteProps {
    children: React.ReactNode;
}