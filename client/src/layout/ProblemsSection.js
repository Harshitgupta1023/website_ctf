import React from "react";
import QuestionCard from "../Components/QuestionCard";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  topppp: {
    transition: "all 0.2s ease-in-out",
    opacity: 0.7,
    "&:hover": {
      transform: "scale3d(1.1, 1.1, 1.1)",
      opacity: 1,
    },
  },
}));
export default function ProblemsSection({ questions }) {
  const classes = useStyles();

  return (
    <div className="topics-section">
      {questions.map((question, index) => (
        <div className={classes.topppp}>
          <QuestionCard
            key={question.id}
            category={question.category}
            points={question.points}
            title={question.title}
            statement={question.statement}
          />
        </div>
      ))}
    </div>
  );
}
