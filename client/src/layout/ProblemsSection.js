import React from "react";
import QuestionCard from "../Displayquestion/QuestionCard";
import { makeStyles } from "@material-ui/core/styles";
import Showquestion from "../testing/Showquestion";
import { Dialog } from "@material-ui/core";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import withRouter from "../utils/withRouter";

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
    // console.log(props);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [ids, setIds] = React.useState("");
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        props.history.push({ pathname: `${props.location.pathname}` });
    };
    const { user } = useContext(AuthContext);

    return (
        <div className="topics-section">
            {props.questions.map((question, index) => (
                <div
                    className={classes.topppp}
                    key={question.id}
                    onClick={(e) => {
                        setIds(question.id);
                        handleClickOpen();
                        props.history.push({
                            pathname: `${props.location.pathname}`,
                            search:
                                "?" +
                                new URLSearchParams({
                                    questionId: question.id,
                                }).toString(),
                        });
                    }}
                >
                    <QuestionCard
                        cssapply
                        onClick={() => handleClickOpen}
                        width={350}
                        solved={
                            user.solvedProblems.indexOf(question.id) === -1
                                ? false
                                : true
                        }
                        height={250}
                        category={question.category}
                        className="question"
                        points={question.points}
                        title={question.title}
                        statement={question.statement}
                        fileURL={question.fileURL}
                        hints={question.hints}
                    />
                    {/* </Link> */}
                </div>
            ))}
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <Showquestion location={props.location.pathname} id={ids} />
            </Dialog>
        </div>
    );
}

export default withRouter(ProblemsSection);
