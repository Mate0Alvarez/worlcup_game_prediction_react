export interface IGameResponse {
    user_id: string;
    game_id: string;
    token: string;
    result: object;
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