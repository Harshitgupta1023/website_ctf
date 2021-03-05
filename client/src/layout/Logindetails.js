import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
      <div className="loginimage">
        <img src={Google} alt="Google icon"></img>
        <img src={Github} alt="Github icon"></img>
        <img src={Linkedin} alt="LinkedIn icon"></img>
      </div>
    </Card>
  );
}
