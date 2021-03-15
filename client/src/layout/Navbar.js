import React, { useState } from "react";

import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
export default function Navbar(props) {
  return (
    <div className="header">
      <Link to="/" className="header_heading links">
        SeekhoCTF
      </Link>
      {props.getStarted && (
        <Link to="/getstarted" className="header_getstarted  links">
          <Button>Get started</Button>
        </Link>
      )}
      {props.home && (
        <Link to="/" className="header_links links">
          <Button>Home</Button>
        </Link>
      )}
      {props.tools && (
        <Link to="/tools" className="header_links  links">
          <Button>Tools</Button>
        </Link>
      )}
      {props.createProblems && (
        <Link to="/problems" className="header_links  links">
          <Button>Create Problem</Button>
        </Link>
      )}
      {props.login ? (
        <Link to="/login" className="header_links  links">
          <Button>Logout</Button>
        </Link>
      ) : (
        <Link to="/getstarted" className="header_links  links">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}
