import React, { useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import useForm from "../customHooks/useForm";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Navbar from "../layout/Navbar";
import { AuthContext } from "../context/auth";
import Loading from "../Components/Loading";
import Avatar from "@material-ui/core/Avatar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $username: String
    $email: String
    $image: Upload
  ) {
    updateUser(id: $id, username: $username, email: $email, image: $image) {
      userID
      token
    }
  }
`;

const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $id: ID!
    $oldPassword: String!
    $newPassword: String!
  ) {
    updatePassword(
      id: $id
      oldPassword: $oldPassword
      newPassword: $newPassword
    ) {
      userID
      token
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    border: "1px solid white",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    textAlign: "center",
    "& > *": {
      margin: "5px",
      "& > *": {
        margin: "20px",
      },
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  box: { border: "1px solid white", padding: "40px", margin: "10px" },
}));

export default function Profile({ history }) {
  const { user, updateUser } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");

  const [updateUserProfile, { loading }] = useMutation(UPDATE_USER, {
    onCompleted({ updateUser: { token } }) {
      updateUser(token);
      setMessage("User Profile Updated!!");
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
  const [updatePassword, { loadingPass }] = useMutation(UPDATE_PASSWORD, {
    onCompleted({ updatePassword: { token } }) {
      updateUser(token);
      setMessage("Updated User Password !!");
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
  const { formInputs, handleInputChange, handleSubmit } = useForm(
    {
      email: "",
      username: "",
      file: null,
      oldPassword: "",
      newPassword: "",
    },
    () => {
      updateUserProfile({
        variables: {
          id: user._id,
          email: formInputs.email,
          username: formInputs.username,
          image: formInputs.file,
        },
      });
    }
  );
  const classes = useStyles();

  return loading || loadingPass ? (
    <Loading loading={loading || loadingPass} />
  ) : (
    <div className="home" style={{ color: "white" }}>
      <Navbar />
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        Update User Profile
      </h1>
      <form
        onSubmit={handleSubmit}
        className={classes.root}
        style={{
          backgroundColor: "black",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div className={classes.box}>
          <TextField
            label={user.username}
            name="username"
            style={{ margin: 8 }}
            placeholder="Required"
            helperText="Enter the new UserName Here"
            onChange={handleInputChange}
            fullWidth
            value={formInputs.username}
            margin="normal"
          />
          <Button
            variant="contained"
            onClick={() =>
              updateUserProfile({
                variables: { id: user._id, username: formInputs.username },
              })
            }
            color="secondary"
          >
            Update UserName
          </Button>
        </div>
        <div className={classes.box}>
          <TextField
            label={user.email}
            name="email"
            type="email"
            style={{ margin: 8 }}
            placeholder="Required"
            helperText="Enter the new Email Here"
            onChange={handleInputChange}
            value={formInputs.email}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            onClick={() =>
              updateUserProfile({
                variables: { id: user._id, email: formInputs.email },
              })
            }
            color="secondary"
          >
            Update Email
          </Button>
        </div>
        <div className={classes.box}>
          <Avatar
            alt={user.username}
            src={`http://localhost:5000/uploads/${user.imageURL}`}
          />
          <Button
            variant="contained"
            component="label"
            // color="secondary"
            label="User Image"
            input={<Input />}
            style={{ marginTop: "20px" }}
          >
            <input
              type="file"
              name="file"
              onChange={handleInputChange}
              // hidden
            />{" "}
            User Avatar
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              updateUserProfile({
                variables: { id: user._id, image: formInputs.file },
              })
            }
            color="secondary"
          >
            Update Avatar
          </Button>
        </div>
        <div className={classes.box}>
          <TextField
            label="Existing Password"
            name="oldPassword"
            type="password"
            style={{ margin: 8 }}
            placeholder="Required"
            helperText="Enter the Existing Password Here"
            onChange={handleInputChange}
            value={formInputs.oldPassword}
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            style={{ margin: 8 }}
            placeholder="Required"
            helperText="Enter the new Password Here"
            onChange={handleInputChange}
            value={formInputs.newPassword}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            onClick={() =>
              updatePassword({
                variables: {
                  id: user._id,
                  oldPassword: formInputs.oldPassword,
                  newPassword: formInputs.newPassword,
                },
              })
            }
            color="secondary"
          >
            Update Password
          </Button>
        </div>
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
  );
}
