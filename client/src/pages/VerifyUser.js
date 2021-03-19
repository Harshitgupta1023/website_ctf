import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Loading from "../Components/Loading";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SEND_VERIFICATION_OTP = gql`
  mutation sendVerificationOTP($id: ID!) {
    sendVerificationOTP(id: $id) {
      id
      verified
      username
      email
      verificationOTP {
        code
      }
    }
  }
`;

const VERIFY_ACCOUNT = gql`
  mutation verifyAccount($id: ID!, $OTP: Int!) {
    verifyAccount(id: $id, OTP: $OTP) {
      userID
      token
    }
  }
`;

export default function FormDialog(props) {
  const { user, updateUser } = useContext(AuthContext);
  const [otp, setOtp] = useState(0);
  const [sendVerificationOTP] = useMutation(SEND_VERIFICATION_OTP, {
    onCompleted: () => {
      setMessage("An OTP has been sent to an Email");
      setSeverity("success");
      setOpen(true);
    },
    onError(err) {
      setMessage("There was an Error. Try Again.");
      setSeverity("error");
      setOpen(true);
    },
  });
  const [verifyAccount, { loading }] = useMutation(VERIFY_ACCOUNT, {
    onCompleted: (data) => {
      setMessage("Your Email has been verified.");
      setSeverity("success");
      setOpen(true);
      updateUser(data.verifyAccount.token);
      props.setOpen(false);
    },
    onError(err) {
      setMessage("There was an Error. Try Again.");
      setSeverity("error");
      setOpen(true);
      props.setOpen(false);
    },
  });
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");
  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSendOTP = () => {
    sendVerificationOTP({ variables: { id: user._id } });
  };

  const handleVerifyOTP = () => {
    verifyAccount({ variables: { id: user._id, OTP: parseInt(otp) } });
  };

  return loading ? (
    <Loading loading={loading} />
  ) : (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Verify User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Verify User, Click on Send OTP. Then Enter the OTP Sent to your
            Email to Verify.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Verification OTP"
            type="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSendOTP} color="primary">
            Send OTP
          </Button>
          <Button onClick={handleVerifyOTP} color="primary">
            Verify OTP
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
