import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { button } from "../data/constants";
import hackingOAuth from "../media/hacking.jpg";
import useForm from "../customHooks/useForm";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import Loading from "../Components/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
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

const REGISTER_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      userID
      token
    }
  }
`;

function SignInSide(props) {
  const classes = useStyles();
  const context = useContext(AuthContext);

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted({ createUser: userData }) {
      console.log(userData);
      context.login(userData);
      props.history.push("/getstarted");
    },
    onError(err) {
      console.log(err);
    },
  });

  const { formInputs, handleInputChange, handleSubmit } = useForm(
    {
      username: "",
      email: "",
      password: "",
    },
    () => {
      registerUser({ variables: formInputs });
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
            Sign up
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
              Sign up
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
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(SignInSide);
