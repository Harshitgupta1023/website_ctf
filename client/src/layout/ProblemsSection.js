import React from "react";
import QuestionCard from "../Components/QuestionCard";
import { makeStyles } from "@material-ui/core/styles";
import { Link, withRouter } from "react-router-dom";

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
function ProblemsSection(props) {
  const classes = useStyles();
  console.log(props.history.location.pathname.split("/")[1]);
  return (
    <div className="topics-section">
      {props.questions.map((question, index) => (
        <div className={classes.topppp}>
          <Link
            to={`/${props.history.location.pathname.split("/")[1]}/${
              question.id
            }`}
            style={{ textDecoration: "none" }}
          >
            <QuestionCard
              id={question.id}
              key={question.id}
              category={question.category}
              points={question.points}
              title={question.title}
              statement={question.statement}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default withRouter(ProblemsSection);
