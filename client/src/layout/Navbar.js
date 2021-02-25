import React, { useState } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = (e) => {
        setAnchorEl(null);
    };
    return (
        <div className="header">
            {/* <Navbar /> */}
            <h1 className="header_heading">SeekhoCTF</h1>
            <IconButton aria-label="notifications" className="header_notif">
                <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon fontSize="large" />
                </Badge>
            </IconButton>
            <IconButton aria-label="settings" className="header_settings">
                <Badge badgeContent={4} color="secondary">
                    <SettingsIcon fontSize="large" />
                </Badge>
            </IconButton>
            <IconButton
                aria-label="profile"
                className="header_profile"
                onClick={handleClick}
            >
                <PersonIcon fontSize="large" />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
