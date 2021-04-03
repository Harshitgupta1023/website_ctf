const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_ACCESS_KEY, ADMIN_IDS, JWT_REFRESH_KEY } = require("../config");
module.exports = async (req, res, next) => {
  const token = req.cookies["accessToken"];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_ACCESS_KEY);
  } catch (err) {
    // Automatically Handle Access Token Refresh
    // And if refreshed the new token is sent as a header in response
    try {
      decodedToken = jwt.verify(req.cookies["refreshToken"], JWT_REFRESH_KEY);
      const user = await User.findById(decodedToken.userID);
      if (!user) {
        throw new Error("User not Found");
      }
      if (user.tokenVersion !== decodedToken.tokenVersion) {
        throw new Error("UnAuthorized");
      }
      res.cookie(
        "accessToken",
        jwt.sign({ userID: user._id }, JWT_ACCESS_KEY, { expiresIn: "15m" }),
        { httpOnly: true }
      );
      req.isAuth = true;
      req.userID = decodedToken.userID;
      if (ADMIN_IDS.includes(decodedToken.userID)) {
        req.isAdmin = true;
      }
      return next();
    } catch (err) {
      req.isAuth = false;
      return next();
    }
  }
  if (ADMIN_IDS.includes(decodedToken.userID)) {
    req.isAdmin = true;
  }
  req.isAuth = true;
  req.userID = decodedToken.userID;
  return next();
};
