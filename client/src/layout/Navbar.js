import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../context/auth";
import { admin_username } from "../config";
import Avatar from "@material-ui/core/Avatar";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  popper: {
    marginRight: "10px",
  },
}));

export default function Navbar(props) {
  const { user, logout } = useContext(AuthContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div className="header">
      <Link to="/" className="header_heading links">
        SeekhoCTF{" "}
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
      {props.createProblems && admin_username.includes(user.username) && (
        <Link to="/problems" className="header_links  links">
          <Button>Create Problem</Button>
        </Link>
      )}
      {user ? (
        <div className={classes.root}>
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Avatar
              alt={user.username}
              src={`http://localhost:5000/uploads/${user.imageURL}`}
            />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            className={classes.popper}
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <Link to="/user/profile" className="header_links links">
                        <MenuItem onClick={handleClose}>My Profile</MenuItem>
                      </Link>

                      <Link to="/login" className="header_links  links">
                        <MenuItem onClick={() => logout()}>Logout</MenuItem>
                      </Link>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      ) : (
        <Link to="/login" className="header_links  links">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}
