import "./App.css";
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Getstarted from "./pages/Getstarted";
import Tools from "./pages/Tools";
import BackgroundVideo from "./layout/BackgroundVideo";
import ProblemsPage from "./pages/ProblemsPage";
import CreateProblem from "./pages/CreateProblem";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { colors } from "./data/constants";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Question from "./pages/Question";
import { gql, useQuery } from "@apollo/client";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Loading from "./Components/Loading";

const GET_PROBLEMS = gql`
    query {
        getProblems {
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

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            dark: colors.primaryDark,
            light: colors.purple,
            main: colors.textPrimary,
        },
        background: {
            default: colors.backgroundSecondary,
            paper: colors.backgroundPrimary,
        },
    },
    background: {
        default: colors.backgroundSecondary,
        paper: colors.backgroundPrimary,
    },
});

const sectionData = [
    "general-skills",
    "cryptography",
    "web-exploitation",
    "reverse-engineering",
    "binary-exploitation",
    "forensics",
];

function App() {
    const { data, error, loading } = useQuery(GET_PROBLEMS);
    if (error) {
        return (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
            </Alert>
        );
    }
    if (loading) return <Loading loading={loading} />;
    const questions = data.getProblems;

    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <BackgroundVideo />
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route
                            exact
                            path="/getstarted"
                            component={Getstarted}
                        />
                        <Route exact path="/tools" component={Tools} />
                        <Route
                            exact
                            path="/problems"
                            component={CreateProblem}
                        />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        {sectionData.map((data, index) => {
                            return (
                                <Route
                                    exact
                                    key={index}
                                    path={`/${data}`}
                                    component={() => (
                                        <ProblemsPage category={data} />
                                    )}
                                />
                            );
                        })}
                        {questions.map((ques) => {
                            console.log(`/${ques.category[0]}/${ques.id}`);
                            return (
                                <Route
                                    key={ques.id}
                                    exact
                                    path={`/${ques.category[0]}/${ques.id}`}
                                    component={() => (
                                        <Question
                                            id={ques.id}
                                            category={ques.category}
                                            points={ques.points}
                                            title={ques.title}
                                            statement={ques.statement}
                                            width={800}
                                            height={600}
                                        />
                                    )}
                                />
                            );
                        })}
                    </Switch>
                </Router>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
