import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { AppCtx } from "../../context/ProdeContext";
import { IGames } from "../../interfaces/interfaces";
import { ProdeContextType } from "../../types/types";
import DatePickerContainer from "../DatePicker/DatePickerContainer";
import GameCard from "./GameCard";
import GameSkeleton from "./GameSkeleton/GameSkeleton";

const GamesContainer = (): JSX.Element | null => {
    const { qatarGames, getGamesByDate, setShowNavBarAndFooter, getGamesFromFirebase } = useContext(
        AppCtx
    ) as ProdeContextType;
    const [games, setGames] = useState<IGames[] | null>(null);
    const [dayValue, setDayValue] = React.useState<Dayjs | null>(
        dayjs("2022-11-20")
    );
    const [loadingGames, setLoadingGames] = useState<boolean>(true);

    const setDate = () => {
        if (dayjs().isAfter(dayValue)) {
            return setDayValue(dayjs());
        }
    };
    const getGames = async (date: string): Promise<void> => {
        setGames(await getGamesByDate(date));
        setTimeout(() => {
            setLoadingGames(false);
        }, 3000);
    };

    useEffect(() => {
        setDate();
        setShowNavBarAndFooter(true);
        getGamesFromFirebase();
    }, []);

    useEffect(() => {
        setLoadingGames(true);
        getGames(dayValue?.format("YYYY-MM-DD") || "");
    }, [qatarGames, dayValue]);

    useEffect(() => {
        if (games?.length) {
            setTimeout(() => {
                setLoadingGames(false);
            }, 1000);
        }
    }, [games])



    return (
        <Box
            sx={{
                backgroundColor: "#3e0315",
                backgroundImage: "url(/background.svg)",
                backgroundSize: "cover",
                minHeight: { sx: "auto", md: "70vh" },
                display: "flex",
                justifyContent: "center",
                pt: 3,
                pb: 3,
            }}
        >
            <Grid
                container
                maxWidth="lg"
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{
                    justifyContent: "center",
                    mb: 5
                }}
            >
                <Grid xs={10} md={4} item>
                    <DatePickerContainer
                        dayValue={dayValue}
                        setDayValue={setDayValue}
                        setLoadingGames={setLoadingGames}
                    />
                </Grid>
                <Grid xs={0} md={12} item></Grid>
                {loadingGames ? (
                    <GameSkeleton />
                ) : (
                    games?.map((game: IGames) => {
                        return (
                            <Grid xs={10} md={6} key={game.id} item>
                                <GameCard game={game}></GameCard>
                            </Grid>
                        );
                    })
                )}
            </Grid>
        </Box>
    );
};

export default GamesContainer;
