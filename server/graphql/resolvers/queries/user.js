const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../../config");

module.exports = {
  Query: {
    login: async (root, args, context, info) => {
      let { username, password } = args;
      let user = await User.findOne({ username: username });
      if (!user) {
        throw new Error("User doesn't exist!");
      }
      const isAuth = await bcrypt.compare(password, user.password);
      if (!isAuth) {
        throw new Error("Password Incorrect!");
      }
      const token = jwt.sign({ userData: user }, JWT_KEY, { expiresIn: "1h" });
      return { userID: user.id, token: token, tokenExpiration: 1 };
    },
  },
};
