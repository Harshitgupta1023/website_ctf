import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
  if (decodedToken.exp * 1000 < Date.now()) localStorage.removeItem("jwtToken");
  else initialState.user = decodedToken.userData;
}

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

  function login({ token }) {
    const decodedToken = jwtDecode(token);
    const userData = decodedToken.userData;
    localStorage.setItem("jwtToken", token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function updateUser(token) {
    const decodedToken = jwtDecode(token);
    const userData = decodedToken.userData;
    localStorage.removeItem("jwtToken");
    localStorage.setItem("jwtToken", token);
    dispatch({
      type: "UPDATE_USER",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout, updateUser }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
