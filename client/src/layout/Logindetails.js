import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Inputfield from "./Inputfield";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import googleOAuth from "./../media/google.svg";
import githubOAuth from "./../media/github.svg";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f5fdfd",
    color: "black",
    minHeight: "100%",
  },
});

export default function Logindetails(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className="loginfield">
          <Inputfield
            condition={props.pagename === "signup" ? "true" : "false"}
          />
        </div>
      </CardContent>

      <hr></hr>
      <Typography
        style={{ color: "black", justifyContent: "center" }}
        variant="body1"
      >
        or connect with
      </Typography>

      <div className="img">
        <img src={googleOAuth} />
        <img src={githubOAuth} />
      </div>
    </Card>
  );
}
