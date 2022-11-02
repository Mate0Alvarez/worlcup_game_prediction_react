import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCtx } from "../../../context/ProdeContext";
import { ProdeContextType } from "../../../types/types";

const UserIcon = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { userData, logOutUser } = useContext(AppCtx) as ProdeContextType;
    const navigate = useNavigate();

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        await logOutUser();
        navigate("/signin");
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const settings = [
        <Typography textAlign="center" onClick={handleLogout}>
            Logout
        </Typography>,
    ];
    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={userData?.name || ''} src="/static/images/avatar/2.jpg" />
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

export default UserIcon;
