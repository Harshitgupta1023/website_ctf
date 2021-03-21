import React, { useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { button } from "../data/constants";
import hackingOAuth from "../media/hacking.jpg";
import GitHubIcon from "@material-ui/icons/GitHub";
import useForm from "../customHooks/useForm";
import Loading from "../Components/Loading";
import { AuthContext } from "../context/auth";
import { gql, useMutation } from "@apollo/client";
import { withRouter } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { GITHUB_CLIENT_ID, GOOGLE_CLIENT_ID } from "../config";

function ConnectWith() {
  return (
    <Typography variant="body2" color="primary" align="center">
      {"or connect with"}
    </Typography>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Handles({ history }) {
  const { updateUser } = useContext(AuthContext);
  const [googleLogin, { loading }] = useMutation(GOOGLE_LOGIN, {
    onCompleted({ googleLogin: { token } }) {
      updateUser(token);
      console.log("Yo boi", token);
      history.push("/getstarted");
    },
    onError(err) {
      console.log(err);
    },
  });
  const [githubLogin, { gitLoading }] = useMutation(GITHUB_LOGIN, {
    onCompleted({ githubLogin: { token } }) {
      updateUser(token);
      console.log("Yo boi", token);
      history.push("/getstarted");
    },
    onError(err) {
      console.log(err);
    },
  });

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      githubLogin({ variables: { code: newUrl[1] } });
    }
  });

  const handleGoogleLogin = ({ tokenId }) => {
    console.log(tokenId);
    googleLogin({ variables: { id_token: tokenId } });
  };
  return loading || gitLoading ? (
    <Loading loading={loading || gitLoading} />
  ) : (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      {/* <a
        href="https://google.com"
        style={{
          marginLeft: "20%",
          marginTop: "2%",
        }}
      >
        <img
          alt="google"
          src={googleOAuth}
          style={{
            height: "50px",
            width: "50px",
          }}
        />
      </a> */}
      <div
        style={{
          marginLeft: "20%",
          marginTop: "2%",
        }}
      >
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleGoogleLogin}
          onFailure={(res) => console.log("Login Failed!", res)}
          theme="dark"
        />
      </div>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`}
        style={{
          marginLeft: "45%",
          marginTop: "10%",
          hover: "",
        }}
      >
        <GitHubIcon />
      </a>
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      userID
      token
    }
  }
`;

const GOOGLE_LOGIN = gql`
  mutation googleLogin($id_token: String!) {
    googleLogin(id_token: $id_token) {
      userID
      token
    }
  }
`;

const GITHUB_LOGIN = gql`
  mutation githubLogin($code: String!) {
    githubLogin(code: $code) {
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
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/getstarted");
    },
    onError(err) {
      setMessage("Credentials Incorrect!!");
      setSeverity("error");
      setOpen(true);
    },
  });
  const { formInputs, handleInputChange, handleSubmit } = useForm(
    { username: "", password: "" },
    () => {
      loginUser({ variables: formInputs });
    }
  );
  if (loading) <Loading />;
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
            Log in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={handleInputChange}
              label="Username"
              name="username"
              value={formInputs.username}
              autoComplete="username"
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formInputs.password}
              onChange={handleInputChange}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log in
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="forgotPass" variant="body2" className="links">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="signup" variant="body2" className="links">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <ConnectWith />
              <Handles history={props.history} />
            </Box>
          </form>
        </div>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default withRouter(SignInSide);
