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

const SUBMIT_ANSWER = gql`
  mutation makeSubmission($id: ID!, $problemID: ID!, $submission: String) {
    makeSubmission(id: $id, problemID: $problemID, submission: $submission) {
      userID
      token
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  textfield: {
    width: "70%",
  },
  answer: {
    position: "absolute",
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
    width: "90%",
  },
}));

export default function Answerpart(props) {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [submitProblem] = useMutation(SUBMIT_ANSWER, {
    onCompleted(data) {
      setShow(true);
      updateUser(data.makeSubmission.token);
    },
    onError(err) {
      console.log(err);
    },
  });
  const { user, updateUser } = useContext(AuthContext);
  const [ans, setAns] = useState(props.answer);
  function handlechange(event) {
    setAns(event.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    submitProblem({
      variables: { problemID: props.problemID, submission: ans, id: user._id },
    });
  };
  return (
    <div>
      {show ? <Confeti /> : null}
      <Grid container spacing={3} className={classes.answer}>
        <Grid item xs={12} className={classes.submissionstats}>
          <Typography variant="p">
            submission : {props.submissions} / accepted: {props.accepted}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
          {props.fileURL && (
            <a
              href={`http://localhost:5000/uploads/${props.fileURL}`}
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
        <CardActions className={classes.answercontainer}>
          <form
            className={classes.textfield}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <TextField
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
              type="submit"
              style={{ marginLeft: 10 }}
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </CardActions>
      </Grid>
    </div>
  );
}
