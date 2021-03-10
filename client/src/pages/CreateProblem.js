import React from "react";
import { gql, useMutation } from "@apollo/client";
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

const CREATE_PROBLEM = gql`
    mutation createProblem(
        $title: String!
        $statement: String!
        $solution: String!
        $points: Int!
        $hints: [String]
        $category: [String]!
        $file: Upload
    ) {
        createProblem(
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
    "crypto",
    "web-exploitation",
    "reverse-engineering",
    "binary-exploitation",
    "forensics",
];

export default function CreateProblem({ history }) {
    const [submitProblem] = useMutation(CREATE_PROBLEM, {
        onCompleted: (data) => console.log(data),
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
            submitProblem({ variables: formInputs });
            history.push("/");
        }
    );
    const classes = useStyles();

    return (
        <div className="home" style={{ color: "white" }}>
            <Navbar />
            <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
                Create Problem
            </h1>
            <form
                onSubmit={handleSubmit}
                className={classes.root}
                style={{
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                <div>
                    <TextField
                        label="Title"
                        name="title"
                        value={formInputs.title}
                        required
                        onChange={handleInputChange}
                        className={classes.textField}
                        margin="normal"
                        helperText="Enter the Problem Title"
                    />
                    <TextField
                        label="Points"
                        name="points"
                        type="number"
                        required
                        value={formInputs.points}
                        onChange={handleInputChange}
                        className={classes.textField}
                        helperText="Enter the points for problem here"
                        margin="normal"
                    />
                    <TextField
                        label="Statement"
                        name="statement"
                        style={{ margin: 8 }}
                        required
                        placeholder="Required"
                        helperText="Enter the Problem Statement Here"
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Solution"
                        name="solution"
                        required
                        style={{ margin: 8 }}
                        placeholder="Required"
                        helperText="Enter the Problem Solution Here"
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">
                            Category
                        </InputLabel>
                        <Select
                            labelId="demo-mutiple-checkbox-label"
                            id="demo-mutiple-checkbox"
                            multiple
                            name="category"
                            required
                            value={formInputs.category}
                            onChange={handleInputChange}
                            input={<Input />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    <Checkbox
                                        checked={
                                            formInputs.category.indexOf(cat) >
                                            -1
                                        }
                                    />
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
                        helperText="Enter multiple hints separated by commas"
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
        </div>
    );
}