const User = require("../../../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  Query: {
    login: async (root, args, context, info) => {
      try {
        let { username, password } = args;
        let user = await User.findOne({ username: username });
        return user;
        throw new Error("Wrong username of password");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
