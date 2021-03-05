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
  
            style={{ fontSize: "25px",marginLeft: "30%",height: "30%",width: "100%" , textTransform: "none", fontWeight: "bolder", color: "white", backgroundColor: "#448ee4"}}
          > Create An Account
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
          <TextField label=" Your email" style={{ width: "100%" }} />
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

      <FormGroup row className= "control-row">
        <FormControlLabel
          style= {{color:"black", marginRight: "33%", marginLeft:"2%"}}
          control={
            <Checkbox
              style= {{color: "#448ee4"}}
              checked={state.checkedB}
              onChange={handleChange}
              name="checkedB"
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label="Remember me"
        />
        <a
          href="#"
          className= "forgot-your"
        >
          {" "}
          Forgot your password?
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
            size="200px"
            style={{ fontSize: "25px", height: "30%",width: "150%" , textTransform: "none",  padding: "5%", fontWeight: "bolder", color: "white", backgroundColor: "#448ee4"}}
          >
            Log In
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
