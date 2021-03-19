import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    height: 300,
  },
}));

export default function Questionstatement(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className="center-col">
        <p>{props.statement} </p>
      </div>
    </div>
  );
}
