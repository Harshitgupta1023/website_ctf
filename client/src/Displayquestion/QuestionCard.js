import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { Button, Divider } from "@material-ui/core";
import Answerpart from "./Answerpart";
import Mainbody from "./Mainbody";
import Tick from "../media/green_tick.svg";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { admin_username } from "../config";
import { AuthContext } from "../context/auth";
const DELETE_PROBLEM = gql`
  mutation deleteProblem($id: ID!) {
    deleteProblem(id: $id) {
      id
      title
      statement
      solution
      fileURL
      points
      hints
      category
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    minWidth: 250,
    opacity: 0.9,
    transitionProperty: "width",
    "&:hover": {
      width: 300,
      opacity: 1,
      transform: "scale3d(1.1, 1.1, 1.1)",
    },
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 10,
    marginBottom: 12,
  },
  pointss: {
    display: "flex",
    width: 70,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  questiontitle: {
    position: "relative",
    color: "",
  },
}));

export default function QuestionCard(props) {
  const classes = useStyles();
  const id = props.id;
  console.log(props.location);
  const [removeProblem] = useMutation(DELETE_PROBLEM, {
    onCompleted: (dat) => console.log(dat),
  });
  const { user } = useContext(AuthContext);

  function handleDelete() {
    removeProblem({ variables: { id } });
    window.location.reload();

    // props.history.push(`${props.location}`);
  }

  return (
    <Card
      className={props.apply ? "" : classes.root}
      style={{
        width: props.width ? props.width : "100%",
        height: props.height,
      }}
      variant="outlined"
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Typography className={classes.questiontitle} variant="h4">
            {props.title}
          </Typography>
          {props.answer && admin_username.includes(user.username) && (
            <Link
              to={`${props.location}/updateproblems/${props.id}`}
              className="links"
            >
              <Button variant="contained">Update</Button>
            </Link>
          )}
          {props.answer && admin_username.includes(user.username) && (
            <Button variant="contained" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Chip
            className={classes.pointss}
            color="secondary"
            label={props.points}
          />
        </div>
        <Divider />
        <div className={classes.pos} color="textSecondary">
          {props.category.map((c, ind) => (
            <Chip
              key={ind}
              label={c}
              style={{
                margin: "3px",
                border: ".5px solid white",
              }}
            />
          ))}
        </div>
        {props.answer && <Divider />}
        <br></br>
        {props.solved && (
          <div style={{ width: 130 }}>
            <h2 style={{ display: "inline" }}>Solved</h2>
            <img
              alt="tick"
              src={Tick}
              style={{
                float: "right",
                height: "38px",
                width: "30px",
              }}
            />
          </div>
        )}
        {props.answer && (
          <Mainbody statement={props.statement} hints={props.hints} />
        )}
        {props.answer && (
          <Answerpart
            problemID={props.id}
            fileURL={props.fileURL}
            submissions={props.submissions}
            accepted={props.accepted}
            solution={props.solution}
          />
        )}
      </CardContent>
    </Card>
  );
}
