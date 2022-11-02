import { useEffect, useContext, useState } from "react";
import { AppCtx } from "../../../context/ProdeContext";
import { ProdeContextType } from "../../../types/types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LinearProgress from '@mui/material/LinearProgress';

export interface IGameResult {
    local: string;
    local_score: string;
    visitor: string;
    visitor_score: string;
    final_result: string;
}

export interface IUserPredictionResult {
    prediction_id: string;
    local_score: string;
    visitor_score: string;
    final_result: string;
    points: number | null;
}

export interface IResultComponentProps {
    game_result: IGameResult;
    user_prediction_result: IUserPredictionResult | null;
}

const ResultComponent = ({
    game_result,
    user_prediction_result,
}: IResultComponentProps) => {
    const { setUserPredictionPoints } = useContext(AppCtx) as ProdeContextType;

    const [points, setPoints] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const setUserPoints = async (): Promise<void> => {
        let totalPoints = 0;

        if (!user_prediction_result) {
            return;
        }
        if (game_result.local_score === user_prediction_result?.local_score) {
            totalPoints = totalPoints + 1;
        }

        if (game_result.visitor_score === user_prediction_result?.visitor_score) {
            totalPoints = totalPoints + 1;
        }

        if (game_result.final_result === user_prediction_result?.final_result) {
            totalPoints = totalPoints + 2;
        }

        await setUserPredictionPoints(
            user_prediction_result?.prediction_id,
            totalPoints
        );

        user_prediction_result.points = totalPoints;
        setPoints(totalPoints);
        setLoading(false);
    };

    useEffect(() => {
        if (!user_prediction_result?.points) {
            setUserPoints();
        } else {
            setPoints(user_prediction_result.points);
            setLoading(false);
        }
    }, [user_prediction_result]);


    return (
        <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
            <Grid xs={12} item sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{ textTransform: "uppercase" }}
                >
                    Final Result:
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                >{game_result.local} {game_result.local_score} {" - "}
                    {game_result.visitor_score} {game_result.visitor}
                </Typography>
            </Grid>
            {loading && (
                <Grid xs={12} item>
                    <Box sx={{ width: "100%" }}>
                        <LinearProgress sx={{ borderRadius: 5 }} />
                    </Box>
                </Grid>
            )}
            {!loading && (
                <Grid xs={12} item>
                    {points > 0 && (
                        <Typography
                            variant="body1"
                            color="secondary"
                            sx={{ textTransform: "uppercase" }}
                        >
                            You won {points} points!
                        </Typography>
                    )}
                    {points === 0 && (
                        <Typography
                            variant="body1"
                            color="text.disabled"
                            sx={{ textTransform: "uppercase" }}
                        >
                            You won {points} points!
                        </Typography>
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export default ResultComponent;
