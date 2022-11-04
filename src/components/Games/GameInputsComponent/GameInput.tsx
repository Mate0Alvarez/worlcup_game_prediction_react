import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { IGames } from "../../../interfaces/interfaces";

export interface IGameInputProps {
    game: IGames;
    local_score: string;
    visitor_score: string;
    editDisabled: boolean;
    handleLocalScoreChange: React.ChangeEventHandler<HTMLInputElement>;
    handleVisitorScoreChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface ICountryContainer {
    name: string;
    flag: string;
    score: string;
    editDisabled: boolean;
    handleScoreChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CountryContainer = ({
    name,
    flag,
    score,
    editDisabled,
    handleScoreChange,
}: ICountryContainer) => {
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
                {name}
            </Typography>
            <div className={flag}></div>
            <Box sx={{
                        display: { xs: "unset", sm: "none" },
                        mt: 2
                    }}>
                <TextField
                    hiddenLabel
                    id="filled-hidden-label-normal"
                    value={score}
                    variant="filled"
                    onChange={handleScoreChange}
                    disabled={editDisabled}
                    inputProps={{
                        type: "number",
                        min: 0,
                        className: "predicitonInput",
                        style: { textAlign: "center", width: "35px" },
                    }}
                    
                />
            </Box>
        </Box>
    );
};

const GameInput = ({
    game,
    local_score,
    visitor_score,
    editDisabled,
    handleLocalScoreChange,
    handleVisitorScoreChange,
}: IGameInputProps) => {
    const local_flag = `fi fi-${game.local_code} fis flagImage`;
    const visitor_flag = `fi fi-${game.visitor_code} fis flagImage`;

    return (
        <Box
            sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
            }}
        >
            <CountryContainer
                name={game.local}
                flag={local_flag}
                score={local_score}
                editDisabled={editDisabled}
                handleScoreChange={handleLocalScoreChange}
            />
            <Box sx={{ width: "25%", display: { xs: "none", sm: "unset" } }}>
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
                                className: "predicitonInput",
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
            <CountryContainer
                name={game.visitor}
                flag={visitor_flag}
                score={visitor_score}
                editDisabled={editDisabled}
                handleScoreChange={handleVisitorScoreChange}
            />
        </Box>
    );
};

export default GameInput;
