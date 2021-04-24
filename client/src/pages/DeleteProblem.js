import { gql, useMutation } from "@apollo/client";
import { Button } from "@material-ui/core";
import React from "react";
import Loading from "../Components/Loading";
import MessagePopup from "../Components/MessagePopup";

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
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");

  const [removeProblem, { loading }] = useMutation(DELETE_PROBLEM, {
    onCompleted() {
      setMessage("Problem Deleted Successfully!");
      setSeverity("success");
      setOpen(true);
    },
    onError({ graphQLErrors }) {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) => {
          setMessage(message);
          setSeverity("error");
          setOpen(true);
        });
      }
    },
  });

  function handleDelete() {
    removeProblem({ variables: { id } });
    props.history.push(`/${props.match.params.category}`);
  }
  if (loading) return <Loading loading={loading} />;
  return (
    <div>
      <Button onClick={handleDelete}>click</Button>
      <MessagePopup
        open={open}
        message={message}
        severity={severity}
        setOpen={setOpen}
        loading={loading}
      />
    </div>
  );
}
