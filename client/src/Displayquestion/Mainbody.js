import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hints from "./Hints";
import Questionstatement from "./Questionstatement";
const useStyles = makeStyles((theme) => ({
  body: {
    width: "95%",
    flexGrow: 1,
  },
}));

export default function Mainbody(props) {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Grid container spacing={3}>
        <Grid item xs={8} sm={8}>
          <h2>Question</h2>
          <Questionstatement statement={props.statement} />
        </Grid>
        <Grid item xs={4} sm={4}>
          <Typography variant="h6">HINTS</Typography>
          {props.hints.map((dat, index) => (
            <Hints number={index + 1} statement={dat} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
}
