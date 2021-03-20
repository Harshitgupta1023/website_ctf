import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Getstarted from "./pages/Getstarted";
import Tools from "./pages/Tools";
import BackgroundVideo from "./layout/BackgroundVideo";
import ProblemsPage from "./pages/ProblemsPage";
import CreateProblem from "./pages/CreateProblem";
import VerifyUser from "./pages/VerifyUser";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";
import ProtectedRoute from "./utils/ProtectedRoute";
import { colors } from "./data/constants";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Showquestion from "./testing/Showquestion";
import {home} from ".//data/constants"
import ForgotPass from "./pages/ForgotPass";
import UpdateProblem from "./pages/UpdateProblem";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      dark: colors.primaryDark,
      light: colors.purple,
      main: colors.textPrimary,
    },
    background: {
      default: home.backgroundSecondary,
      paper: home.backgroundPrimary,
      // paper: "white"
    },
  },
  background: {
    default: home.backgroundSecondary,
    paper: home.backgroundPrimary,
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
  return (
    <AuthProvider>
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <BackgroundVideo />
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/getstarted" component={Getstarted} />
              <Route exact path="/tools" component={Tools} />
              <Route exact path="/problems" component={CreateProblem} />
              <Route
                exact
                path="/updateproblems/:id"
                component={UpdateProblem}
              />
              <Route exact path="/user/verify" component={VerifyUser} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={Signup} />
              <AuthRoute exact path="/forgotPass" component={ForgotPass} />
              {sectionData.map((data, index) => {
                return (
                  <Route
                    exact
                    key={index}
                    path={`/${data}`}
                    component={() => <ProblemsPage category={data} />}
                  />
                );
              })}
              <ProtectedRoute
                exact
                path="/:category/:id"
                component={Showquestion}
              />
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    </AuthProvider>
  );
}

export default App;
