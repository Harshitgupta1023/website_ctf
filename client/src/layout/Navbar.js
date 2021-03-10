import React, { useState } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
export default function Navbar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
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

      <Link to="/getstarted" className="header_getstarted  links">
        <Button>Get started</Button>
      </Link>
      <Link to="/" className="header_home links">
        <Button>Home</Button>
      </Link>
      <Link to="/tools" className="header_tools  links">
        <Button>Tools</Button>
      </Link>
      <Link to="/login" className="header_login  links">
        <Button>Login</Button>
      </Link>
      <Link to="/problems" className="header_createproblem  links">
        <Button>Create Problem</Button>
      </Link>
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
