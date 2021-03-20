import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../context/auth";
import { admin_username } from "../config";

export default function Navbar(props) {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="header">
      <Link to="/" className="header_heading links">
        SeekhoCTF{" "}
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
      {props.createProblems && admin_username.includes(user.username) && (
        <Link to="/problems" className="header_links  links">
          <Button>Create Problem</Button>
        </Link>
      )}
      {user ? (
        <Link to="/login" className="header_links  links">
          <Button onClick={() => logout()}>Logout</Button>
        </Link>
      ) : (
        <Link to="/login" className="header_links  links">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
}
