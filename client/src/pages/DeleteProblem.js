import { gql, useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";
import React from "react";

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

export default function DeleteProblem(props) {
  const id = props.match.params.id;
  console.log(id);
  const [removeProblem] = useMutation(DELETE_PROBLEM, {
    onCompleted: (dat) => console.log(dat),
  });

  function handleDelete() {
    removeProblem({ variables: { id } });
    props.history.push(`/${props.match.params.category}`);
  }

  return (
    <div>
      <Button onClick={handleDelete}>click</Button>
    </div>
  );
}
