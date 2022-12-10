import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getAccessToken } from "../data/authToken";

function ProtectedRoute({ component: Component, ...rest }) {
    const accessToken = getAccessToken();
    return (
        <Route
            {...rest}
            render={(props) => {
                return !accessToken ? (
                    <Navigate to="/login" />
                ) : (
                    <Component {...props} />
                );
            }}
        />
    );
}

export default ProtectedRoute;
