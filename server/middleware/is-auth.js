const jwt = require("jsonwebtoken");
const { JWT_KEY, ADMIN_USERNAMES } = require("../config");
module.exports = (req, res, next) => {
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
    decodedToken = jwt.verify(token, JWT_KEY);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  if (ADMIN_USERNAMES.includes(decodedToken.userData.username)) {
    req.isAdmin = true;
  }
  req.isAuth = true;
  req.userID = decodedToken.userData._id;
  req.oldTok = token;
  req.expTime = decodedToken.exp;
  return next();
};
