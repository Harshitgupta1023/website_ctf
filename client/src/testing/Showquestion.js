import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Loading from "../Components/Loading";
import ProblemsPage from "../pages/ProblemsPage";
import QuestionCard from "../Components/QuestionCard";
const GET_PROBLEM = gql`
  query getProblem($id: ID!) {
    getProblem(id: $id) {
      id
      title
      statement
      solution
      fileURL
      points
      hints
      category
      submissions
      accepted
    }
  }
`;

export default function Showquestion(props) {
  const id = props.match.params.id;
  const category = props.match.params.category;
  const { data, error, loading } = useQuery(GET_PROBLEM, {
    variables: { id },
  });
  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    );
  }
  if (loading) return <Loading loading={loading} />;
  //   console.log(data);
  const ques = data.getProblem;
  return (
    <div>
      <Link to={`/${category}`} className="links">
        <ProblemsPage category={category} />
      </Link>
      {/* <Link to={`/${category}/${id}`}> */}
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
          width={800}
          height={600}
          id={ques.id}
          category={ques.category}
          points={ques.points}
          title={ques.title}
          statement={ques.statement}
        />
      </div>
      {/* </Link> */}
    </div>
  );
}
