const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  req.isAdmin = false;
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_ACCESS_KEY);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (process.env.ADMIN_IDS.includes(decodedToken.userID)) {
    req.isAdmin = true;
  }
  req.isAuth = true;
  req.userID = decodedToken.userID;
  return next();
};
