const jwt = require("jsonwebtoken");
const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = require("../config");

const createRefreshToken = (user) => {
  return jwt.sign(
    { userID: user._id, tokenVersion: user.tokenVersion },
    JWT_REFRESH_KEY,
    { expiresIn: "7d" }
  );
};

const createAccessToken = (user) => {
  return jwt.sign({ userID: user._id }, JWT_ACCESS_KEY, {
    expiresIn: "15m",
  });
};

const sendRefreshToken = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/refresh_token",
  });
};

module.exports = { createAccessToken, createRefreshToken, sendRefreshToken };
