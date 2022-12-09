import React, { useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
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
import GoogleLogin from "react-google-login";
import { setAccessToken } from "../data/authToken";
import withRouter from "../utils/withRouter";
import MessagePopup from "../Components/MessagePopup";

function ConnectWith() {
    return (
        <Typography variant="body2" color="primary" align="center">
            {"or connect with"}
        </Typography>
    );
}

function Handles({ history }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [severity, setSeverity] = React.useState("success");
    const { login, updateUser } = useContext(AuthContext);
    const [googleLogin, { loading }] = useMutation(GOOGLE_LOGIN, {
        onCompleted({ googleLogin: loginData }) {
            login(loginData);
            console.log("Yo boi", loginData);
            history.push("/getstarted");
        },
        onError({ graphQLErrors }) {
            if (graphQLErrors) {
                graphQLErrors.forEach(({ message }) => {
                    setMessage(message);
                    setSeverity("error");
                    setOpen(true);
                });
            }
        },
    });
    const [githubLogin, { gitLoading }] = useMutation(GITHUB_LOGIN, {
        onCompleted({ githubLogin: { user, token } }) {
            updateUser(user);
            setAccessToken(token);
            history.push("/getstarted");
        },
        onError({ graphQLErrors }) {
            if (graphQLErrors) {
                graphQLErrors.forEach(({ message }) => {
                    setMessage(message);
                    setSeverity("error");
                    setOpen(true);
                });
            }
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
        googleLogin({ variables: { id_token: tokenId } });
    };
    return loading || gitLoading ? (
        <Loading loading={loading || gitLoading} />
    ) : (
        <div className={classes.handleContainer}>
            <div className={classes.subHandleContainer}>
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={handleGoogleLogin}
                    onFailure={(res) => console.log("Login Failed!", res)}
                    theme="dark"
                    className={classes.googleLink}
                />
                <a
                    href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`}
                >
                    <GitHubIcon className={classes.githubIconStyle} />
                </a>
            </div>
            <MessagePopup
                open={open}
                message={message}
                severity={severity}
                setOpen={setOpen}
                loading={loading}
            />
        </div>
    );
}

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
    googleLink: {
        paddingTop: "0",
    },
    handleContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
        width: "90%",
    },
    subHandleContainer: {
        width: "50%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
    githubIconStyle: {
        height: "45px",
        width: "45px",
        color: "white",
        paddingTop: "2%",
    },
}));

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            user {
                id
                username
                email
                imageURL
                points
                verified
                solvedProblems
            }
            token
        }
    }
`;

const GOOGLE_LOGIN = gql`
    mutation googleLogin($id_token: String!) {
        googleLogin(id_token: $id_token) {
            user {
                id
                username
                email
                imageURL
                points
                verified
                solvedProblems
            }
            token
        }
    }
`;

const GITHUB_LOGIN = gql`
    mutation githubLogin($code: String!) {
        githubLogin(code: $code) {
            user {
                id
                username
                email
                imageURL
                points
                verified
                solvedProblems
            }
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
        onError({ graphQLErrors }) {
            if (graphQLErrors) {
                graphQLErrors.forEach(({ message }) => {
                    setMessage(message);
                    setSeverity("error");
                    setOpen(true);
                });
            }
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
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
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
                        {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
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
                                <Link
                                    to="forgotPass"
                                    variant="body2"
                                    className="links"
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    to="signup"
                                    variant="body2"
                                    className="links"
                                >
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
            <MessagePopup
                open={open}
                message={message}
                severity={severity}
                setOpen={setOpen}
                loading={loading}
            />
        </Grid>
    );
}

export default withRouter(SignInSide);
