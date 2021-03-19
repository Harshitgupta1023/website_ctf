import React from "react";
import { gql, useQuery } from "@apollo/client";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Loading from "../Components/Loading";
import QuestionCard from "../Displayquestion/QuestionCard";
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
  const id = props.id;
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
    <QuestionCard
      apply
      answer
      width={600}
      height={600}
      id={ques.id}
      category={ques.category}
      points={ques.points}
      title={ques.title}
      statement={ques.statement}
      hints={ques.hints}
      solution={ques.solution}
      submissions={ques.submissions}
      accepted={ques.accepted}
      fileURL={ques.fileURL}
    />
  );
}
