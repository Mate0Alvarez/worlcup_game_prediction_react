import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { AppCtx } from "../../context/ProdeContext";
import { IGames, IUserPredictionSaved } from "../../interfaces/interfaces";
import { ProdeContextType } from "../../types/types";
import "./GameCard.css";
import { IGameResult, IUserPredictionResult } from "./ResultComponent/ResultComponent";
import SavePredictionComponent from "./SavePrediction/SavePredictionComponent";
import UpdatePredictionComponent from "./UpdatePrediction/UpdatePredictionComponent";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import ResultComponent from "./ResultComponent/ResultComponent";
import SnackbarPush from '../utils/SnackbarPush';
import dayjs, { Dayjs } from "dayjs";

export interface IGameCardProps {
    game: IGames;
}

export interface ICountryContainer {
    name: string;
    flag: string;
}

const CountryContainer = (props: ICountryContainer) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                {props.name}
            </Typography>
            <div className={props.flag}></div>
        </Box>
    );
};

const GameCard = (props: IGameCardProps): JSX.Element => {
    const { userData, userPredictions, setGameStatus } = useContext(AppCtx) as ProdeContextType;

    const [local_score, setLocal_score] = useState<string>("0");
    const [visitor_score, setVisitor_score] = useState<string>("0");
    const [userPrediction, setUserPrediction] =
        useState<IUserPredictionSaved | null>(null);
    const [editDisabled, setEditDisabled] = useState<boolean>(false);
    const [updatePrediction, setUpdatePrediction] = useState<boolean>(false);
    const [userPredictionResult, setUserPredictionResult] = useState<IUserPredictionResult | null>(null)
    const [updatePredictionError, setUpdatePredictionError] = useState<boolean>(false);
    const [updatePredictionSuccess, setUpdatePredictionSuccess] = useState<boolean>(false);
    const [savePredictionError, setSavePredictionError] = useState<boolean>(false);
    const [savePredictionSuccess, setSavePredictionSuccess] = useState<boolean>(false);
    const [predictionEnabled, setPredictionEnabled] = useState<boolean>(true);

    const handleLocalScoreChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.value === "") {
            return setLocal_score("0");
        }
        setLocal_score(event.target.value);
    };

    const handleVisitorScoreChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.value === "") {
            return setVisitor_score("0");
        }
        setVisitor_score(event.target.value);
    };

    const handleEditPrediction = async () => {
        setEditDisabled(false);
        setUpdatePrediction(true);
    };

    const getUserPredictionFromContext = () => {
        const prediction = userPredictions.find(
            (userPredictionFromContext) =>
                userPredictionFromContext.game_id === props.game.id
        );

        if (prediction) {
            setUserPredictionResult({
                prediction_id: prediction.prediction_id,
                local_score: prediction.local_score,
                visitor_score: prediction.visitor_score,
                final_result: prediction.result,
                points: prediction.points || null
            })
            return setUserPrediction(prediction);
        }

        setUserPredictionResult({
            prediction_id: "",
            local_score: "",
            visitor_score: "",
            final_result: "",
            points: 0
        })
        return setUserPrediction(null);
    };

    const game_result: IGameResult = {
        local: props.game.local,
        local_score: props.game.local_score,
        visitor: props.game.visitor,
        visitor_score: props.game.visitor_score,
        final_result: props.game.final_result
    }

    const local_flag = `fi fi-${props.game.local_code} fis flagImage`;
    const visitor_flag = `fi fi-${props.game.visitor_code} fis flagImage`;
    const date = new Date(props.game.time_stamp.seconds * 1000);

    const controlPredictionEnabled = async (): Promise <void> => {
        if (props.game.status !== 'open') {
            return setPredictionEnabled(false);
        }

        const game_date = dayjs(props.game.time_stamp.seconds * 1000);

        if (game_date.subtract(1, 'hour') <  dayjs()) {
            await setGameStatus(props.game.id,'closed');
            return setPredictionEnabled(false);
        }

        setPredictionEnabled(true);
    }

    useEffect(() => {
        getUserPredictionFromContext();
    }, [userPredictions, userData]);

    useEffect(() => {

        controlPredictionEnabled();

        if (userPrediction) {
            setEditDisabled(true);
            setLocal_score(userPrediction?.local_score || "");
            setVisitor_score(userPrediction?.visitor_score || "");
        } else {
            setEditDisabled(false);
            setLocal_score("0");
            setVisitor_score("0");
        }
    }, [userPrediction]);

    return (
        <>
            {(updatePredictionError) && (
                <SnackbarPush
                    text_error="Ups! Something happend updating your prediction, please try again later"
                    severity="error"
                />
            )}
            {(updatePredictionSuccess) && (
                <SnackbarPush
                    text_error="Prediction updated!"
                    severity="success"
                ></SnackbarPush>
            )}
            {savePredictionError && (
                <SnackbarPush
                    text_error="Ups! Something happend saving your prediction, please try again later"
                    severity="error"
                ></SnackbarPush>
            )}
            {savePredictionSuccess && (
                <SnackbarPush
                    text_error="Prediction saved!"
                    severity="success"
                ></SnackbarPush>
            )}
            <Box
                sx={{
                    backgroundColor: "rgba(0,0,0,.4)",
                    backdropFilter: "blur(4px)",
                    color: "white",
                    borderRadius: "25px",
                    padding: "20px 35px 10px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h5">{date.toLocaleString()}</Typography>
                    <Typography
                        variant="body1"
                        color="secondary"
                        sx={{ textTransform: "uppercase" }}
                    >
                        Status: {props.game.status}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                >
                    <CountryContainer name={props.game.local} flag={local_flag} />
                    <Box sx={{ width: "25%" }}>
                        <Grid container spacing={2}>
                            <Grid xs={5} item>
                                <TextField
                                    hiddenLabel
                                    id="filled-hidden-label-normal"
                                    value={local_score}
                                    variant="filled"
                                    onChange={handleLocalScoreChange}
                                    disabled={editDisabled}
                                    inputProps={{
                                        type: "number",
                                        min: 0,
                                        style: { textAlign: "center" },
                                    }}
                                />
                            </Grid>
                            <Grid
                                xs={2}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                item
                            >
                                -
                            </Grid>
                            <Grid xs={5} item>
                                <TextField
                                    hiddenLabel
                                    id="filled-hidden-label-normal"
                                    value={visitor_score}
                                    variant="filled"
                                    onChange={handleVisitorScoreChange}
                                    disabled={editDisabled}
                                    inputProps={{
                                        type: "number",
                                        min: 0,
                                        style: { textAlign: "center" },
                                        className: "predicitonInput",
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <CountryContainer name={props.game.visitor} flag={visitor_flag} />
                </Box>
                <CardActions sx={{ mt: 2, textAlign: "center" }}>
                    {props.game.status === "finished" && (
                        <ResultComponent
                            game_result={game_result}
                            user_prediction_result={userPredictionResult}
                        />
                    )}
                    {props.game.status === "open" && (
                        <>
                            {!userPrediction && (
                                <SavePredictionComponent
                                    game_id={props.game.id}
                                    local_score={local_score}
                                    visitor_score={visitor_score}
                                    setPredictionSuccess={setSavePredictionSuccess}
                                    setPredictionError={setSavePredictionError}
                                    predictionEnabled={predictionEnabled}
                                />
                            )}
                            {userPrediction && !updatePrediction && (
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleEditPrediction}
                                >
                                    Edit prediction
                                </Button>
                            )}
                            {updatePrediction && (
                                <UpdatePredictionComponent
                                    userPrediction={userPrediction}
                                    local_score={local_score}
                                    visitor_score={visitor_score}
                                    setEditDisabled={setEditDisabled}
                                    setUpdatePrediction={setUpdatePrediction}
                                    setPredicitionSuccess={setUpdatePredictionSuccess}
                                    setPredictionError={setUpdatePredictionError}
                                    predictionEnabled={predictionEnabled}
                                />
                            )}
                        </>
                    )}
                </CardActions>
            </Box>
        </>
    );
};

export default GameCard;
