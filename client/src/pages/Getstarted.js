import React, { useContext, useState } from "react";
import TopicsSection from "../layout/TopicsSection";
import MuiAlert from "@material-ui/lab/Alert";
import Navbar from "../layout/Navbar";
import { AuthContext } from "../context/auth";
import FormDialog from "./VerifyUser";
import Button from "@material-ui/core/Button";

function Alert(props) {
  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <MuiAlert elevation={6} variant="filled" {...props} />
    </div>
  );
}

function Getstarted() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Navbar home getStarted tools />
      {user && !user.verified && (
        <Button onClick={(e) => setOpen(true)} style={{ width: "100%" }}>
          <Alert severity="warning">
            Your account has not been verified. Click to Verify.
          </Alert>
        </Button>
      )}
      <FormDialog open={open} setOpen={setOpen} />
      <TopicsSection />
    </div>
  );
}

export default Getstarted;
