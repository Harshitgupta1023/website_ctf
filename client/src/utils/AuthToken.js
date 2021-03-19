export const authToken = localStorage.getItem("jwtToken");

export function setAuthToken(token) {
  localStorage.setItem("jwtToken", token);
}

export function deleteAuthToken() {
  localStorage.removeItem("jwtToken");
}
