import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Divider } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Confeti from "./Confeti";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import MessagePopup from "../Components/MessagePopup";

const SUBMIT_ANSWER = gql`
  mutation makeSubmission($id: ID!, $problemID: ID!, $submission: String) {
    makeSubmission(id: $id, problemID: $problemID, submission: $submission) {
      id
      username
      email
      imageURL
      points
      verified
      solvedProblems
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  textfield: {
    width: "80%",
  },
  buttonfield: {
    marginLeft: 30,
  },
  answercontainer: {
    display: "flex",
    width: "100%",
  },
  fileContainer: {
    marginLeft: 12,
    width: "50%",
    display: "flex",
    alignItems: "center",
  },
  accuracy: {
    border: "1px solid white",
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: "5px 10px",
  },
  downloadFileCOntainer: {
    marginLeft: 30,
  },
}));

export default function Answerpart(props) {
  const classes = useStyles();
  const [subm, setSubm] = useState(props.submissions);
  const [accep, setAccep] = useState(props.accepted);
  const [show, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");

  const [submitProblem, { loading }] = useMutation(SUBMIT_ANSWER, {
    onCompleted({ makeSubmission: user }) {
      updateUser(user);
      setShow(true);
      setAccep(accep + 1);
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
  const { user, updateUser } = useContext(AuthContext);
  const [ans, setAns] = useState("");
  function handlechange(event) {
    setAns(event.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubm(subm + 1);
    submitProblem({
      variables: { problemID: props.problemID, submission: ans, id: user.id },
    });
  };
  return (
    <div>
      {show ? <Confeti setShow={setShow} /> : null}
      <div className={classes.fileContainer}>
        <div className={classes.accuracyContainer}>
          <Typography className={classes.accuracy}>
            Accuracy : {Math.round((accep * 100) / subm === 0 ? 1 : subm)}%
          </Typography>
        </div>
        <div className={classes.downloadFileCOntainer}>
          {props.fileURL && (
            <a
              href={`${process.env.REACT_APP_SERVER_URL}/uploads/${props.fileURL}`}
              className="links"
            >
              <Button variant="contained" size="large">
                <GetAppIcon fontSize="small" /> File
              </Button>
            </a>
          )}
        </div>
      </div>
      <Divider style={{ marginTop: 20, marginBottom: 20 }} />
      <Grid container spacing={3} className={classes.answer}>
        <CardActions style={{ width: 600 }}>
          <form
            className={classes.answercontainer}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <TextField
              className={classes.textfield}
              fullWidth
              id="filled-basic"
              label="IITJCTF{flag}"
              variant="filled"
              onChange={(event) => {
                handlechange(event);
              }}
              value={ans}
            />
            <Button
              className={classes.buttonfield}
              type="submit"
              variant="contained"
              size="large"
            >
              Submit
            </Button>
          </form>
        </CardActions>
      </Grid>
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
