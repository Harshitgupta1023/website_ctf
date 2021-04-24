import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { getAccessToken, setAccessToken } from "./data/authToken";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { setContext } from "@apollo/client/link/context";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: "accessToken",
      isTokenValidOrUndefined: () => {
        const token = getAccessToken();

        if (!token) {
          return true;
        }

        try {
          const { exp } = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            return false;
          } else {
            return true;
          }
        } catch {
          return false;
        }
      },
      fetchAccessToken: () => {
        return fetch("http://localhost:5000/refresh_token", {
          method: "POST",
          credentials: "include",
        });
      },
      handleFetch: (accessToken) => {
        setAccessToken(accessToken);
      },
      handleError: (err) => {
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
      },
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors);
      console.log(networkError);
    }),
    authLink,
    createUploadLink({
      uri: "http://localhost:5000/graphql",
      fetch,
      credentials: "include",
    }),
  ]),
  cache: new InMemoryCache(),
});

// export const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: authLink.concat(
//     createUploadLink({
//       uri: "http://localhost:5000/graphql",
//       credentials: "include",
//     })
//   ),
// });
