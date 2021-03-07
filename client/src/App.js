import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import BackgroundVideo from "./layout/BackgroundVideo";
import ProblemsPage from "./pages/ProblemsPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { colors } from "./data/constants";
import { sectionData } from "./data/constants";
import { data } from "./data/questionsData";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Question from "./pages/Question";
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
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <BackgroundVideo />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {sectionData.map((data) => {
              return (
                <Route
                  exact
                  key={data.id}
                  path={data.link}
                  component={() => <ProblemsPage category={data.category} />}
                />
              );
            })}
            {data.map((ques) => {
              console.log(`${ques.category}${ques.id}`);
              return (
                <Route
                  key={ques.id}
                  exact
                  path={`/${ques.category[1]}/${ques.id}`}
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
