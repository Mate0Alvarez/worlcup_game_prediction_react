import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { IGameResponse, IGames } from "../../interfaces/interfaces";
import {useState, useContext} from 'react';
import {AppCtx} from '../../context/ProdeContext';
import {ProdeContextType} from '../../types/types';
import "./GameCard.css";
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
    const { userData, savePrediction } = useContext(AppCtx) as ProdeContextType;

    const [showSavePridctionButton, setshowSavePridctionButton] =
        useState<boolean>(true);
    const [local_score, setLocal_score] = useState<string>('');
    const [visitor_score, setVisitor_score] = useState<string>('');

    const handleLocalScoreChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
        setLocal_score(event.target.value);
    }

    const handleVisitorScoreChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
        setVisitor_score(event.target.value);
    }

    const getResult = (local_score: string, visitor_score: string ) => {
        if (local_score > visitor_score) {
            return 'L';
        }
        if (local_score < visitor_score) {
            return 'V';
        }
        return 'D';
    }
    
    const handleSavePrediction = async() => {
        const prediction: IGameResponse = {
            user_id: userData.id,
            game_id: props.game.id,
            result: {
                local_score: local_score,
                visitor_score: visitor_score,
                result: getResult(local_score, visitor_score)
            }
        }

        const predictionSaved = await savePrediction(prediction);
        if (!predictionSaved) {
            
        }
    }

    const local_flag = `fi fi-${props.game.local_code} fis flagImage`;
    const visitor_flag = `fi fi-${props.game.visitor_code} fis flagImage`;
    const date = new Date(props.game.date.seconds * 1000);

    return (
        <Box
            sx={{
                backgroundColor: "rgba(0,0,0,.4)",
                color: "white",
                borderRadius: "25px",
                padding: "20px 35px 10px",
            }}
        >
            <Typography variant="h5">{date.toLocaleString()}</Typography>
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
                                defaultValue={props.game.local_score}
                                variant="filled"
                                onChange={handleLocalScoreChange}
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
                                defaultValue={props.game.visitor_score}
                                variant="filled"
                                onChange={handleVisitorScoreChange}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <CountryContainer name={props.game.visitor} flag={visitor_flag} />
            </Box>
            <CardActions>
                <Button size="small" color="secondary">
                    Status: {props.game.status}
                </Button>
                <Button size="small" color="success">
                    You won 3 points!
                </Button>
                {showSavePridctionButton && (
                    <Button size="small" variant="outlined" color="secondary" onClick={handleSavePrediction}>
                        Save prediction
                    </Button>
                )}
            </CardActions>
        </Box>
    );
};

export default GameCard;
