import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  //   toolbar: theme.mixins.toolbar,
  //   drawerPaper: {
  // width: drawerWidth,
  //   },
  content: {
    height: 200,
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
}));

export default function Questionstatement(props) {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <h1>Question</h1>
      <Typography paragraph>{props.statement}</Typography>
    </main>
  );
}
