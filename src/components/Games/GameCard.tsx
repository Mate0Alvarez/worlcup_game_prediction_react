import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { AppCtx } from "../../context/ProdeContext";
import {
    IGames, IUserPredictionSaved
} from "../../interfaces/interfaces";
import { ProdeContextType } from "../../types/types";
import "./GameCard.css";
import SavePredictionComponent from "./SavePrediction/SavePredictionComponent";
import UpdatePredictionComponent from "./UpdatePrediction/UpdatePredictionComponent";
import "/node_modules/flag-icons/css/flag-icons.min.css";

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
    const { userPredictions } = useContext(
        AppCtx
    ) as ProdeContextType;

    const [local_score, setLocal_score] = useState<string>("0");
    const [visitor_score, setVisitor_score] = useState<string>("0");
    const [userPrediction, setUserPrediction] = useState<IUserPredictionSaved | null>(
        null
    );
    const [editDisabled, setEditDisabled] = useState<boolean>(false);
    const [updatePrediction, setUpdatePrediction] = useState<boolean>(false);

    const handleLocalScoreChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLocal_score(event.target.value);
    };

    const handleVisitorScoreChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
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
            return setUserPrediction(prediction);
        }
        return setUserPrediction(null)
    };

    const local_flag = `fi fi-${props.game.local_code} fis flagImage`;
    const visitor_flag = `fi fi-${props.game.visitor_code} fis flagImage`;
    const date = new Date(props.game.time_stamp.seconds * 1000);


    useEffect(() => {
        getUserPredictionFromContext();
    }, [userPredictions]);

    useEffect(() => {
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
                    alignItems: "center"
                }}>
                <Typography variant="h5">{date.toLocaleString()}</Typography>
                <Typography variant="body1" color="secondary" sx={{textTransform: "uppercase"}}>Status: {props.game.status}</Typography>
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
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
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
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <CountryContainer name={props.game.visitor} flag={visitor_flag} />
                </Box>
                <CardActions sx={{mt:2, textAlign: "right"}}>

                    {props.game.status === "finished" && (
                        <Button color="success">
                            You won 3 points!
                        </Button>
                    )}
                    {!userPrediction && (
                        <SavePredictionComponent 
                            game_id={props.game.id}
                            local_score={local_score}
                            visitor_score={visitor_score}
                        />
                    )}
                    {(userPrediction && !updatePrediction) && (
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
                        />
                    )}
                </CardActions>
            </Box>
        </>
    );
};

export default GameCard;
