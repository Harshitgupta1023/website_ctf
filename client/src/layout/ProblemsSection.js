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
  return (
    <div className="topics-section">
      {questions.map((question, index) => (
        <div className="topppp" key={question.id}>
          <QuestionCard
            category={question.category}
            className="question"
            points={question.points}
            title={question.title}
            statement={question.statement}
            fileURL={question.fileURL}
          />
        </div>
      ))}
    </div>
  );
}
