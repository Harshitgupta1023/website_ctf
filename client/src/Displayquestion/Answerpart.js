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
  answer: {
    // position: "absolute",
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
  },
  body: {
    flexGrow: 1,
  },
  submissionstats: {
    width: "100%",
    marginLeft: 12,
    backgroundColor: "gray",
  },
  answercontainer: {
    marginTop: 10,
    display: "flex",
    // justifyContent:"center",
    width: "100%",
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
      <Grid container spacing={3} className={classes.answer}>
        <Grid item xs={12} className={classes.submissionstats}>
          <Typography>
            Accuracy : {Math.round((accep * 100) / subm === 0 ? 1 : subm)}%
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
          {props.fileURL && (
            <a
              href={`${process.env.SERVER_URL}/uploads/${props.fileURL}`}
              className="links"
            >
              <Button
                variant="contained"
                size="small"
                style={{ marginTop: 10 }}
              >
                <GetAppIcon fontSize="small" /> File
              </Button>
            </a>
          )}
        </Grid>
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
