export interface IGameResponse {
    user_id: string;
    game_id: string;
    token: string;
    result: object;
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




/* export type ProdeContextType = {
    account: string,
    balance: string,
    games: Array<object>,
    setPrediction: (flightIndex: number, prediction: string) => Promise<any>,
    userResults: Array<object>,
    refundableEther: string,
    redeemLoyaltyPoints: () => Promise<any>
} */