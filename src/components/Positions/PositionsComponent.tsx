import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useContext, useState } from 'react';
import PositionsTable from "./PositionsTable";
import { AppCtx } from '../../context/ProdeContext';
import { ProdeContextType } from '../../types/types';
import { IUserWithPoints } from "../../interfaces/interfaces";

export default function PositionsComponent() {

    const [usersWithPoints, setUsersWithPoints] = useState<IUserWithPoints[] | []>([])

    const { getUsersWithPoints } = useContext(
        AppCtx
    ) as ProdeContextType;

    const getUserWithPointsFromContext = async (): Promise<void> => {

        const users = await getUsersWithPoints();

        const ordered_users = users.sort((user_a, user_b) => {
            if (+user_a.points < +user_b.points) {
                return 1;
            }

            if (+user_a.points > +user_b.points) {
                return -1;
            }

            return 0;
        })
        setUsersWithPoints(ordered_users);
    }


    useEffect(() => {
        getUserWithPointsFromContext()
    }, [])

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
                    mb: 5,
                }}
            >
                <Grid xs={11} md={6} item>
                    <PositionsTable users_with_points={usersWithPoints}/>
                </Grid>
            </Grid>
        </Box>
    );
}
