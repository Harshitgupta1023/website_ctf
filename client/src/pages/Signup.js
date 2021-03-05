import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Link } from "react-router-dom";
import Logindetails from "../layout/Logindetails";

const forbutton = { color: "black" };
export default function Signup() {
  return (
    <div className="login">
      <div className="loginHeading">
        <h1 className= "heading-auth-box">Seekho</h1>
      </div>
      <div className="loginTitle">
        <h2 className="title-auth-box">CTF Easily</h2>
      </div>
      <div className="loginSubtitle">
        <h3 className="sub-title-auth-box">Lorem Ipsum</h3>
      </div>
      <div className = "auth-box">
        <div className="loginButton">
          <ButtonGroup
            aria-label="large outlined button group"
            style={{ display: "flex-wrap", alignItems: "centre", width: "100%"}}
          >
            <Button
              variant="contained"
              style={{ fontSize: "27px", width: "50%" , textTransform: "none",  padding: 0, margin: 0, fontWeight: "bolder"}}
            >
              <Link className="links" to="/login">Sign up</Link>
              {/* <a href= "http://localhost:3000/signup" className= "links">Sign up</a> */}
              
            </Button>
            <Button
              variant="contained"
              style={{ fontSize: "27px", width: "50%", textTransform: "none", padding: 0, margin: 0 , fontWeight: "bolder"}}
            >
              <Link className="links" to="/login">Log in</Link>
              {/* <a href= "http://localhost:3000/login" className= "links">Log in</a> */}
            </Button>
          </ButtonGroup>
        </div>
        <div className="logindetails ">
          <Logindetails pagename="signup" />
        </div>
      </div>
    </div>
  );
}
