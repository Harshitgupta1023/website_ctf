import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Inputfield from "./Inputfield";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import Google from "../media/google.jpg";
import Github from "../media/github.jpg";
import Linkedin from "../media/linkedin.jpg";
const useStyles = makeStyles({
  root: {
    backgroundColor: "#e0e0e0",
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
      <Divider style={{ backgroundColor: "red" }} />

      <Typography
        style={{ display: "flex", justifyContent: "center" }}
        variant="bpdy1"
      >
        or connet with
      </Typography>
      <div>
        <img src={Google}></img>
        <img src={Github}></img>
        <img src={Linkedin}></img>
      </div>
    </Card>
  );
}
