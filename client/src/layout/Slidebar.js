import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";
import { sectionData } from "../data/constants";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    position: "absolute",
    marginTop: "40px",
    height: "450px",
    overflowX: "hidden",
    borderRadius: "10px",
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div
      className={classes.root}
      style={{ position: "relative" }}
      onMouseOver={() => setOpen(true)}
      onMouseOut={() => setOpen(false)}
    >
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.paper]: true,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <h3 style={!open ? { display: "none" } : {}}>Categories</h3>
        </div>
        <Divider />
        <List>
          {sectionData.map((data) => (
            <Link to={data.link} key={data.id} className="links">
              <ListItem button>
                <ListItemIcon>
                  {data.id % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>{" "}
                <ListItemText primary={data.title} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />

        <div className={classes.toolbar}>
          <Link to="/" className="links">
            <h3 style={!open ? { display: "none" } : {}}>Back to Home</h3>
          </Link>
          <Link to="/" className="links">
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </div>
      </Drawer>
    </div>
  );
}
