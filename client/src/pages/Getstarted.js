import React, { useContext, useState } from "react";
import TopicsSection from "../layout/TopicsSection";
import MuiAlert from "@material-ui/lab/Alert";
import Navbar from "../layout/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import FormDialog from "./VerifyUser";

function Alert(props) {
  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <MuiAlert elevation={6} variant="filled" {...props} />
    </div>
  );
}

function Getstarted() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Navbar home="true" />
      {user && !user.verified && (
        <div
          onClick={(e) => setOpen((prev) => setOpen(!prev))}
          style={{ cursor: "pointer" }}
        >
          <Alert severity="warning">
            Your account has not been verified. Click to Verify.
          </Alert>
        </div>
      )}
      {user && !user.verified && <FormDialog open={open} setOpen={setOpen} />}
      <TopicsSection />
    </div>
  );
}

export default Getstarted;
