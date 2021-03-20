import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { button } from "../data/constants";
import hackingOAuth from "../media/hacking.jpg";
import discordOAuth from "../media/discord.svg";
import googleOAuth from "../media/google.svg";
import useForm from "../customHooks/useForm";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import Loading from "../Components/Loading";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ConnectWith() {
  return (
    <Typography variant="body2" color="primary" align="center">
      {"or connect with"}
    </Typography>
  );
}

function Handles() {
  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <a href="www.google.com">
        <img
          alt="google"
          src={googleOAuth}
          style={{
            marginLeft: "20%",
            marginTop: "3%",
            height: "50px",
            width: "50px",
          }}
        />
      </a>
      <Link href="">
        <img
          alt="discord"
          src={discordOAuth}
          style={{
            marginLeft: "40%",
            marginTop: "3%",
            height: "50px",
            width: "50px",
          }}
        />
      </Link>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${hackingOAuth})`,
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: button.buttonBackgroundColor,
    color: button.buttonColor,
    fontWeight: button.buttonFontWeight,
    fontSize: button.buttonFontSize,
    textTransform: button.buttonTextTransform,
    "&:hover": {
      backgroundColor: button.buttonHoverColor,
    },
  },
}));

const SEND_FORGOTPASS_OTP = gql`
  mutation sendForgotPassOTP($username: String!, $email: String!) {
    sendForgotPassOTP(username: $username, email: $email) {
      id
      username
      email
    }
  }
`;

const FORGOT_PASSWORD = gql`
  mutation forgotPassword(
    $username: String!
    $email: String!
    $OTP: Int!
    $newPassword: String!
  ) {
    forgotPassword(
      username: $username
      email: $email
      OTP: $OTP
      newPassword: $newPassword
    ) {
      userID
      token
    }
  }
`;

function SignInSide(props) {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");

  const [sendForgotPassOTP] = useMutation(SEND_FORGOTPASS_OTP, {
    onCompleted({ sendForgotPassOTP: data }) {
      console.log("An OTP has been sent to your email!", data);
      setMessage("An OTP has been sent to your email!");
      setSeverity("success");
      setOpen(true);
    },
    onError(err) {
      console.log(err);
      setMessage("There was an Error. Try Again.");
      setSeverity("error");
      setOpen(true);
    },
  });

  const [forgotPass, { loading }] = useMutation(FORGOT_PASSWORD, {
    onCompleted({ forgotPassword: { token } }) {
      context.updateUser(token);
      props.history.push("/getstarted");
    },
    onError(err) {
      console.log(err);
      setMessage("There was an Error. Try Again.");
      setSeverity("error");
      setOpen(true);
    },
  });

  const handleSendOTP = () => {
    sendForgotPassOTP({
      variables: { username: formInputs.username, email: formInputs.email },
    });
  };

  const { formInputs, handleInputChange, handleSubmit } = useForm(
    {
      username: "",
      email: "",
      OTP: "",
      newPassword: "",
    },
    () => {
      forgotPass({ variables: { ...formInputs, OTP: Number(formInputs.OTP) } });
    }
  );

  if (loading) return <Loading loading />;
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="username"
              value={formInputs.username}
              onChange={handleInputChange}
              autoComplete="uName"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              value={formInputs.email}
              onChange={handleInputChange}
              name="email"
              autoComplete="email"
            />
            <Button
              container
              style={{ paddingTop: 10 }}
              onClick={handleSendOTP}
            >
              <Grid item>Send OTP to Email</Grid>
            </Button>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="OTP"
              label="OTP"
              type="number"
              value={formInputs.OTP}
              onChange={handleInputChange}
              name="OTP"
              autoComplete="OTP"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              value={formInputs.newPassword}
              onChange={handleInputChange}
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <div variant="body2" className="links"></div>
              </Grid>
              <Grid item>
                <Link to="/login" variant="body2" className="links">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <ConnectWith />
              <Handles />
            </Box>
          </form>
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
      </Grid>
    </Grid>
  );
}

export default withRouter(SignInSide);
