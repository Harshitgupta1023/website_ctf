import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
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
import MessagePopup from "../Components/MessagePopup";
import withRouter from "../utils/withRouter";

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
            token
            user {
                id
                username
                email
                imageURL
                points
                verified
                solvedProblems
            }
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

    const [forgotPass, { loading }] = useMutation(FORGOT_PASSWORD, {
        onCompleted({ forgotPassword: loginData }) {
            context.login(loginData);
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

    const handleSendOTP = () => {
        sendForgotPassOTP({
            variables: {
                username: formInputs.username,
                email: formInputs.email,
            },
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
            forgotPass({
                variables: { ...formInputs, OTP: Number(formInputs.OTP) },
            });
        }
    );

    if (loading) return <Loading loading />;
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
                            <Grid item>
                                <Button variant="contained">
                                    Send OTP to Email
                                </Button>
                            </Grid>
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
                                <Link
                                    to="/login"
                                    variant="body2"
                                    className="links"
                                >
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <MessagePopup
                        open={open}
                        message={message}
                        severity={severity}
                        setOpen={setOpen}
                        loading={loading}
                    />
                </div>
            </Grid>
        </Grid>
    );
}

export default withRouter(SignInSide);
