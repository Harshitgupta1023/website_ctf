import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Getstarted from "./pages/Getstarted";
import Tools from "./pages/Tools";
import BackgroundVideo from "./layout/BackgroundVideo";
import ProblemsPage from "./pages/ProblemsPage";
import CreateProblem from "./pages/CreateProblem";
import VerifyUser from "./pages/VerifyUser";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { setAccessToken } from "./data/authToken";
import AuthRoute from "./utils/AuthRoute";
import ProtectedRoute from "./utils/ProtectedRoute";
import { colors } from "./data/constants";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Showquestion from "./testing/Showquestion";
import { home } from "./data/constants";
import ForgotPass from "./pages/ForgotPass";
import UpdateProblem from "./pages/UpdateProblem";
import Profile from "./pages/Profile";
import Loading from "./Components/Loading";
import { gql, useLazyQuery } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { AuthContext } from "./context/auth";
import dotenv from "dotenv";
dotenv.config();
const FETCH_USER = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      id
      username
      email
      imageURL
      points
      verified
      solvedProblems
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

function App(props) {
  const [loading, setLoading] = useState(true);
  const { updateUser } = useContext(AuthContext);
  const [fetchUser] = useLazyQuery(FETCH_USER, {
    onCompleted: ({ getUserById: user }) => {
      updateUser(user);
      setLoading(false);
    },
    onError() {
      console.log("Fetch User failed");
      setAccessToken("");
      setLoading(false);
    },
  });

  useEffect(() => {
    fetch(`${process.env.SERVER_URL}/refresh_token`, {
      method: "POST",
      credentials: "include",
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      if (accessToken) {
        const { userID } = jwtDecode(accessToken);
        fetchUser({
          variables: { id: userID },
        });
      } else {
        setLoading(false);
      }
    });
    console.log(process.env.SERVER_URL);
  }, [fetchUser]);

  if (loading) <Loading loading={loading} />;
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <BackgroundVideo />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/getstarted" component={Getstarted} />
            <Route exact path="/tools" component={Tools} />
            <ProtectedRoute exact path="/problems" component={CreateProblem} />
            <ProtectedRoute
              exact
              path="/:category/updateproblems/:id"
              component={UpdateProblem}
            />
            <ProtectedRoute exact path="/user/profile" component={Profile} />
            <Route exact path="/user/verify" component={VerifyUser} />
            <AuthRoute exact path="/login" component={Login} />
            {/* Important for Callback */}
            <AuthRoute exact path="/callback" component={Login} />
            <AuthRoute exact path="/signup" component={Signup} />
            <AuthRoute exact path="/forgotPass" component={ForgotPass} />
            {sectionData.map((data, index) => {
              return (
                <ProtectedRoute
                  exact
                  key={index}
                  path={`/${data}`}
                  component={ProblemsPage}
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
  );
}

export default App;
