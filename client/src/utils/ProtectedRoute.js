import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getAccessToken } from "../data/authToken";

function ProtectedRoute({ component: Component, ...rest }) {
  const accessToken = getAccessToken();
  return (
    <Route
      {...rest}
      render={(props) => {
        return !accessToken ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
}

export default ProtectedRoute;
