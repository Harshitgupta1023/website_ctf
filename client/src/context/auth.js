import React, { useReducer, createContext } from "react";
import { setAccessToken } from "../data/authToken.js";

const initialState = {
  user: null,
};

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
  updateUser: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login({ token, user }) {
    setAccessToken(token);
    dispatch({
      type: "LOGIN",
      payload: user,
    });
  }

  function updateUser(user) {
    dispatch({
      type: "UPDATE_USER",
      payload: user,
    });
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
    setAccessToken("");
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        accessToken: state.accessToken,
        login,
        logout,
        updateUser,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
