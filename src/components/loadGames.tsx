import { Timestamp } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { loadGame } from '../firebase/api';
import Button from '@mui/material/Button';

const LoadGames = () => {

    const [subidaOk, setSubidaOk] = useState<boolean>(false);
    const [cargando, setcargando] = useState<boolean>(false)

    const subirPartidos = async () => {

        setcargando(true);

        const games = [
                {
                    "local": "Cameroon",
                    "local_score": "-",
                    "local_code": "cm",
                    "visitor": "Brazil",
                    "visitor_score": "-",
                    "visitor_code": "br",
                    "final_result": "-",
                    "time_stamp": "2022-12-2 16:00",
                    "status": "pending",
                    "date": "2022-12-02"
                }
        ];

        try {
            await games.map(async (game): Promise<void> => {
                //await loadGame({ ...game, time_stamp: Timestamp.fromDate(new Date(game.time_stamp)) });
            })

            setcargando(false);
            setSubidaOk(true);
        } catch (error) {
            console.error(error)
            setcargando(false);
            setSubidaOk(false);
        }
    }

    return (
        <>
            <Button variant="contained" sx={{ mt: 5, mb: 5 }} onClick={subirPartidos}>Cargar partidos</Button>
            {(cargando) && (
                <div>cargado</div>
            )}
            {(!cargando && subidaOk) && (
                <div>todo ok</div>
            )}
            {(!cargando && !subidaOk) && (
                <div>hubo errores</div>
            )}
        </>
    )
}

export default LoadGames