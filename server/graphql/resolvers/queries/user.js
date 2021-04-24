const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = require("../../../config");

module.exports = {
  Query: {
    getUserById: async (root, args, { req }, info) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated! Please Login");
      }
      let { id } = args;
      if (req.userID != id && !req.isAdmin) {
        throw new Error("Unauthorized");
      }
      let user = await User.findById(id);
      if (!user) {
        throw new Error("User not Found!");
      }
      return user;
    },
  },
};
