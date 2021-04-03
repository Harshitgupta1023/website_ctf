const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = require("../../../config");

module.exports = {
  Query: {
    login: async (root, args, { req }, info) => {
      if (req.isAuth) {
        throw new Error("User Already Logged In");
      }
      let { username, password } = args;
      let user = await User.findOne({ username: username });
      if (!user) {
        throw new Error("User doesn't exist!");
      }
      const isAuth = await bcrypt.compare(password, user.password);
      if (!isAuth) {
        throw new Error("Password Incorrect!");
      }
      res.cookie(
        "accessToken",
        jwt.sign({ userID: user._id }, JWT_ACCESS_KEY, { expiresIn: "15m" }),
        { httpOnly: true }
      );
      res.cookie(
        "refreshToken",
        jwt.sign(
          { userID: user._id, tokenVersion: user.tokenVersion },
          JWT_REFRESH_KEY,
          { expiresIn: "7d" }
        ),
        { httpOnly: true }
      );
      return user;
    },
  },
};
