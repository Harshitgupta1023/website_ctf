import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hints from "./Hints";
const useStyles = makeStyles((theme) => ({
  body: {
    flexGrow: 1,
  },
}));

export default function Mainbody(props) {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Grid container spacing={3}>
        <Grid item xs={8} sm={6}>
          <Typography variant="body2">{props.statement}</Typography>
        </Grid>

        <Grid item xs={4} sm={6}>
          <Typography variant="h4">HINTS</Typography>
          <Hints />
        </Grid>
      </Grid>
    </div>
  );
}
