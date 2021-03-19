import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { Divider } from "@material-ui/core";
import Answerpart from "./Answerpart";
import Mainbody from "./Mainbody";
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

  return (
    <Card
      className={props.apply ? "" : classes.root}
      style={{ width: props.width, height: props.height }}
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
        <div>
          {props.answer && (
            <Mainbody statement={props.statement} hints={props.hints} />
          )}
        </div>

        {props.answer && (
          <Answerpart
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
