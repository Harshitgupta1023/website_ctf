import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import MailIcon from "@material-ui/icons/Mail";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import Password from "./Password";
import LockIcon from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function Forsiginup() {
  const classes = useStyles();

  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <PermIdentityIcon fontSize="large" />
        </Grid>
        <Grid item style={{ backgroundColor: "#c0d0d1", width: "75%" }}>
          <TextField label="First and Last Name" style={{ width: "100%" }} />
        </Grid>
      </Grid>
      <br></br>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <MailIcon fontSize="large" />
        </Grid>
        <Grid item style={{ backgroundColor: "#c0d0d1", width: "75%" }}>
          <TextField label=" Email" style={{ width: "100%" }} />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <LockIcon fontSize="large" />
        </Grid>
        <Grid item style={{ backgroundColor: "#c0d0d1", width: "75%" }}>
          <Password />
        </Grid>
      </Grid>
      <br />
      <Divider style={{ backgroundColor: "white" }} />
      <br />

      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs={4}>
          <p></p>
        </Grid>

        <Grid item>
          <Button
            size="large"
            style={{ backgroundColor: "red", fontSize: "20px" }}
          >
            Create an Account
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

function Forlogin() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.margin}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <MailIcon fontSize="large" />
        </Grid>
        <Grid item style={{ backgroundColor: "#c0d0d1", width: "75%" }}>
          <TextField label=" Email" style={{ width: "100%" }} />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <LockIcon fontSize="large" />
        </Grid>
        <Grid item style={{ backgroundColor: "#c0d0d1", width: "75%" }}>
          <Password />
        </Grid>
      </Grid>
      <br />
      <Divider style={{ backgroundColor: "white" }} />
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedB}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label="Remember Me"
        />
        <a
          href="#"
          style={{ display: "flex", justifyContent: "center", margin: "auto" }}
        >
          {" "}
          Forgot Your Password
        </a>
      </FormGroup>
      <Divider style={{ backgroundColor: "white" }} />
      <br />

      <Grid container spacing={1} alignItems="flex-end">
        <Grid item xs={9}>
          <p></p>
        </Grid>

        <Grid item>
          <Button
            size="large"
            style={{ backgroundColor: "red", fontSize: "20px" }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
export default function InputWithIcon(props) {
  return (
    <div>{props.condition === "true" ? <Forsiginup /> : <Forlogin />}</div>
  );
}
