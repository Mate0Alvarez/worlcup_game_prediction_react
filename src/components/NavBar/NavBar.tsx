import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext, useState } from 'react';
import { AppCtx } from '../../context/ProdeContext';
import { ProdeContextType } from '../../types/types';
import UserIcon from "../User/UserIcon/UserIcon";
import { Link, LinkProps } from "react-router-dom";

const LinkWithoutDecoration = (props: LinkProps) => {
    return <Link {...props} style={{ textDecoration: "none", color: "unset" }}></Link>
};

const pages = [
    <LinkWithoutDecoration to="/positions">Positions</LinkWithoutDecoration>,
    <LinkWithoutDecoration to="/rules">Rules</LinkWithoutDecoration>
];

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const { userData, showNavBar } = useContext(AppCtx) as ProdeContextType;

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            {showNavBar && (
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Box
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    mr: 1,
                                    width: "120px",
                                }}
                                component="img"
                                alt="Qatar Wolrd Cup 2022."
                                src="/qatar_logo.svg"
                            />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "Poppins",
                                    fontWeight: 700,
                                    letterSpacing: ".1rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                    textTransform: "uppercase",
                                }}
                            >
                                Prode
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: "block", md: "none" },
                                    }}
                                >
                                    {pages.map((page, index) => (
                                        <MenuItem key={index} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center" >{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Box
                                sx={{
                                    display: { xs: "flex", md: "none" },
                                    mr: 10,
                                    flexGrow: 1,
                                    width: "40px",
                                }}
                                component="img"
                                alt="Qatar Wolrd Cup 2022."
                                src="/qatar_logo.svg"
                            />
                            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                                {pages.map((page, index) => (
                                    <Button
                                        key={index}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: "white", display: "block" }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>

                            {userData && <UserIcon />}
                        </Toolbar>
                    </Container>
                </AppBar>
            )}
        </>
    );
};

export default NavBar;
