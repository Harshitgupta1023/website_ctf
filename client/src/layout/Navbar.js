import React, { useContext, useState } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../context/auth";
export default function Navbar(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { user, logout } = useContext(AuthContext);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = (e) => {
        setAnchorEl(null);
    };
    return (
        <div className="header">
            <Link to="/" className="header_heading links">
                SeekhoCTF
            </Link>
            {props.getStarted && (
                <Link to="/getstarted" className="header_getstarted  links">
                    <Button>Get started</Button>
                </Link>
            )}
            {props.home && (
                <Link to="/" className="header_links links">
                    <Button>Home</Button>
                </Link>
            )}
            {props.tools && (
                <Link to="/tools" className="header_links  links">
                    <Button>Tools</Button>
                </Link>
            )}
            {props.createProblems && (
                <Link to="/problems" className="header_links  links">
                    <Button>Create Problem</Button>
                </Link>
            )}
            {user ? (
                <Link to="/login" className="header_links  links">
                    <Button onClick={() => logout()}>Logout</Button>
                </Link>
            ) : (
                <Link to="/login" className="header_links  links">
                    <Button>Login</Button>
                </Link>
            )}

            {/* <IconButton
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
      </Menu> */}
        </div>
    );
}
