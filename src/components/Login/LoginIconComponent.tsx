import LoginIcon from "@mui/icons-material/Login";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginIconComponent = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSignUp = async () => {
        navigate("/signup");
    };

    const handleSignIn = async () => {
        navigate("/signin");
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const settings = [
        <Typography textAlign="center" onClick={handleSignIn}>
            Sign In
        </Typography>,
        <Typography textAlign="center" onClick={handleSignUp}>
            Sign Up
        </Typography>,
    ];
    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <LoginIcon />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting, index) => (
                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                        {setting}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default LoginIconComponent;
