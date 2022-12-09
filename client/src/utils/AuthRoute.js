import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getAccessToken } from "../data/authToken";

function AuthRoute({ component: Component, ...rest }) {
    const accessToken = getAccessToken();
    return (
        <Route
            {...rest}
            render={(props) =>
                accessToken ? (
                    <Navigate to={`${props.history.goBack()}`} />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}

export default AuthRoute;
