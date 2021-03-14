import React from "react";
import ProblemsPage from "./ProblemsPage";
import QuestionCard from "../Components/QuestionCard";
import { Link, withRouter } from "react-router-dom";
function Question(props) {
  return (
    <Link to={`/${props.history.location.pathname.split("/")[1]}`}>
      <div style={{ position: "relative" }}>
        <div style={{ opacity: 0.5, position: "absolute" }}>
          {props.category.map((ca) => {
            return <ProblemsPage category={ca} />;
          })}
        </div>
        <Link to={`/${props.category}/${props.id}`}>
          <div
            style={{
              opacity: 1,
              zIndex: 9,
              position: "absolute",
              alignContent: "center",
              top: "100px",
              left: "400px",
            }}
          >
            <QuestionCard
              width={props.width}
              height={props.height}
              id={props.id}
              category={props.category}
              points={props.points}
              title={props.title}
              statement={props.statement}
            />
          </div>
        </Link>
      </div>
    </Link>
  );
}

export default withRouter(Question);
