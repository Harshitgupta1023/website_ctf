let authToken = "";

export const getAccessToken = () => authToken;

export const setAccessToken = (token) => (authToken = token);
