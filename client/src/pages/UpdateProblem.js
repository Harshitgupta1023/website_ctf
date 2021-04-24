import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import useForm from "../customHooks/useForm";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Navbar from "../layout/Navbar";
import MessagePopup from "../Components/MessagePopup";
import Loading from "../Components/Loading";

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
const UPDATE_PROBLEM = gql`
  mutation updateProblem(
    $id: ID!
    $title: String
    $statement: String
    $solution: String
    $points: Int
    $hints: [String]
    $category: [String]
    $file: Upload
  ) {
    updateProblem(
      id: $id
      title: $title
      statement: $statement
      solution: $solution
      points: $points
      hints: $hints
      category: $category
      file: $file
    ) {
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    border: "1px solid white",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    textAlign: "center",
    "& > *": {
      margin: "5px",
      "& > *": {
        margin: "20px",
      },
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const categories = [
  "general-skills",
  "cryptography",
  "web-exploitation",
  "reverse-engineering",
  "binary-exploitation",
  "forensics",
];
export default function UpdateProblem(props) {
  const id = props.match.params.id;
  const { data } = useQuery(GET_PROBLEM, {
    variables: { id },
  });
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");
  //   console.log(props);
  const [submitProblem, { loading }] = useMutation(UPDATE_PROBLEM, {
    onCompleted() {
      setMessage("Problem Created Successfully!");
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
  const { formInputs, handleInputChange, handleSubmit } = useForm(
    {
      title: "",
      statement: "",
      solution: "",
      hints: [],
      category: [],
      points: 0,
      file: null,
    },
    () => {
      submitProblem({
        variables: {
          id,
          title: formInputs.title,
          statement: formInputs.statement,
          solution: formInputs.solution,
          hints: formInputs.hints,
          category: formInputs.category,
          points: formInputs.points,
          file: formInputs.file,
        },
      });
      props.history.push(`/${props.match.params.category}`);
    }
  );
  const classes = useStyles();
  if (loading) return <Loading loading={loading} />;
  return (
    <div className="home" style={{ color: "white" }}>
      <Navbar />
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        Update Problem
      </h1>
      <form
        onSubmit={handleSubmit}
        className={classes.root}
        style={{
          backgroundColor: "black",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div>
          <TextField
            label={data.getProblem.title}
            name="title"
            value={formInputs.title}
            onChange={handleInputChange}
            className={classes.textField}
            margin="normal"
            helperText="Enter the New Problem Title"
          />
          <TextField
            label={data.getProblem.Points}
            name="points"
            type="number"
            value={formInputs.points}
            onChange={handleInputChange}
            className={classes.textField}
            helperText="Enter the New Points for problem here"
            margin="normal"
            style={{ marginTop: 35 }}
          />
          <TextField
            label={data.getProblem.statement}
            name="statement"
            style={{ margin: 8 }}
            placeholder="Required"
            helperText="Enter the New Problem Statement Here"
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label={data.getProblem.solution}
            name="solution"
            style={{ margin: 8 }}
            placeholder="Required"
            helperText="Enter the New Problem Solution Here"
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Category</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              name="category"
              value={formInputs.category}
              onChange={handleInputChange}
              input={<Input />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  <Checkbox checked={formInputs.category.indexOf(cat) > -1} />
                  <ListItemText primary={cat} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Hints"
            value={formInputs.hints.join()}
            className={classes.textField}
            name="hints"
            helperText="Enter multiple hints separated by commas minium three letters !!"
            margin="dense"
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            component="label"
            // color="secondary"
            input={<Input />}
            style={{ marginTop: "20px" }}
          >
            <input
              type="file"
              name="file"
              onChange={handleInputChange}
              // hidden
            />
          </Button>
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            // component="label"
            color="secondary"
          >
            Submit
          </Button>
        </div>
      </form>
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
