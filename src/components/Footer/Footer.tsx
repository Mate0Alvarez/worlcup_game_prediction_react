import React from "react";
import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { GitHub } from "@mui/icons-material";
import { useContext } from "react";
import { AppCtx } from "../../context/ProdeContext";
import { ProdeContextType } from "../../types/types";

const Footer = () => {
    const { showFooter } = useContext(AppCtx) as ProdeContextType;

    return (
        <>
            {showFooter && (
                <Box
                    sx={{
                        pt: 5,
                        backgroundColor: "primary.dark",
                        boxShadow:
                            "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
                    }}
                >
                    <Container
                        maxWidth="xl"
                        sx={{
                            p: 3,
                            backgroundColor: "primary.dark",
                            display: "flex",
                            flexDirection: "column",
                            color: "#fff",
                        }}
                    >
                        <Box
                            component="img"
                            sx={{
                                height: 100,
                                mb: 1,
                            }}
                            alt="Qatar 2022."
                            src="/logo_without_text.svg"
                        />
                        <Typography
                            component="div"
                            variant="h6"
                            sx={{ textAlign: "center", mb: 1 }}
                        >
                            Prode Qatar 2022
                        </Typography>
                        <hr style={{ width: "50%", marginBottom: "15px" }} />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                textAlign: "center",
                            }}
                        >
                            Game created by Mateo&nbsp;Álvarez
                        </Box>
                        <a
                            href="https://github.com/Mate0Alvarez/worlcup_game_prediction_react"
                            target="_blank"
                            rel="noreferrer"
                            style={{ textAlign: "center", marginTop: "10px" }}
                        >
                            <GitHub fontSize="large" sx={{ color: "#ffffff" }} />
                        </a>
                    </Container>
                </Box>
            )}
        </>
    );
};

export default Footer;
