import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Loading from "../Components/Loading";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MessagePopup({
  open,
  severity,
  message,
  setOpen,
  loading,
}) {
  return loading ? (
    <Loading loading />
  ) : (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert onClose={() => setOpen(false)} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
