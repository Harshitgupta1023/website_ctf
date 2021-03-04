import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Link } from "react-router-dom";
import Logindetails from "../layout/Logindetails";

const forbutton = { color: "black" };
export default function Login() {
  return (
    <div className="login">
      <div className="loginHeading">
        <h1>website</h1>
      </div>
      <div className="loginTitle">
        <p>for ctf</p>
      </div>
      <div className="loginSubtitle">
        <p>practice</p>
      </div>
      <div className="loginButton">
        <ButtonGroup
          size="large"
          aria-label="large outlined button group"
          style={{ display: "flex", alignItems: "centre", width: "100%" }}
        >
          <Button
            variant="contained"
            style={{ fontSize: "20px", width: "50%" }}
          >
            <Link to="/signup" className="links" style={forbutton}>
              SignUp
            </Link>
          </Button>
          <Button
            variant="contained"
            style={{ fontSize: "20px", width: "50%" }}
          >
            <Link to="login" className="links" style={forbutton}>
              Login
            </Link>
          </Button>
        </ButtonGroup>
      </div>
      <div className="logindetails ">
        <Logindetails pagename="login" />
      </div>
    </div>
  );
}
