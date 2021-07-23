import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    height: 200,
    overflow: "auto",
  },
}));

export default function Questionstatement(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <p>{props.statement} </p>
    </div>
  );
}
