import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { AppCtx } from "../context/ProdeContext";
import { updateGame } from "../firebase/api";
import { ProdeContextType } from "../types/types";

const UpdateGames = () => {
    const { qatarGames } = useContext(AppCtx) as ProdeContextType;

    const [updateOk, setUpdateOk] = useState<boolean>(false);
    const [cargando, setcargando] = useState<boolean>(false);

    const update = () => {
        try {
            qatarGames.map(async (game) => {
                await updateGame(game.id);
            });

            setcargando(false);
            setUpdateOk(true);
        } catch (error) {
            console.error(error);
            setcargando(false);
            setUpdateOk(false);
        }
    };

    useEffect(() => { }, [qatarGames]);

    return (
        <>
            <Button variant="contained" sx={{ mt: 5, mb: 5 }} onClick={update}>
                Cargar partidos
            </Button>
            {cargando && <div>cargado</div>}
            {!cargando && updateOk && <div>todo ok</div>}
            {!cargando && !updateOk && <div>hubo errores</div>}
        </>
    );
};

export default UpdateGames;
