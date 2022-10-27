import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { IGames } from "../../types/types";
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
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        }}>
            <Typography variant="h6" sx={{ mb: 2 }}>{props.name}</Typography>
            <div className={props.flag}></div>
        </Box>
    );
};

const GameCard = (props: IGameCardProps): JSX.Element => {
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
                            />
                        </Grid>
                    </Grid>
                </Box>
                <CountryContainer name={props.game.visitor} flag={visitor_flag} />
            </Box>
            <CardActions>
                <Button size="large" color="secondary">Status: {props.game.status}</Button>
                <Button size="large" variant="outlined" color="secondary">Save prediction</Button>
            </CardActions>
        </Box>
    );
};

export default GameCard;
