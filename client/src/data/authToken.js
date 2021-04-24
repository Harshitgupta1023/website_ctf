let authToken = "";

export const getAccessToken = () => {
  return authToken;
};

export const setAccessToken = (token) => {
  authToken = token;
};
