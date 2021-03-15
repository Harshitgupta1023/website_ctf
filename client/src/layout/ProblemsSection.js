import React from "react";
import QuestionCard from "../Components/QuestionCard";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Showquestion from "../testing/Showquestion";
import { Dialog } from "@material-ui/core";
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
  const [open, setOpen] = React.useState(false);
  const [ids, setIds] = React.useState("");

  const handleClickOpen = (a) => {
    console.log(a);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="topics-section">
      {props.questions.map((question, index) => (
        <div
          className={classes.topppp}
          key={question.id}
          onClick={(e) => {
            setIds(question.id);
            handleClickOpen();
          }}
        >
          <QuestionCard
            // onClick={() => handleClickOpen}
            category={question.category}
            className="question"
            points={question.points}
            title={question.title}
            statement={question.statement}
            fileURL={question.fileURL}
          />
          {/* </Link> */}
        </div>
      ))}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Showquestion id={ids} />
      </Dialog>
    </div>
  );
}

export default withRouter(ProblemsSection);
