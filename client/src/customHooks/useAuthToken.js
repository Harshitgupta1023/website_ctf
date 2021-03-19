export default function useAuthToken() {
  const authToken = localStorage.getItem("jwtToken");

  function setAuthToken(token) {
    localStorage.setItem("jwtToken", token);
  }

  function deleteAuthToken() {
    localStorage.removeItem("jwtToken");
  }
  return [authToken, setAuthToken, deleteAuthToken];
}
