const User = require("../../../models/User");
const userValidator = require("../../validators/userValidators");
const path = require("path");
const fs = require("fs");
const upload = require("../../upload/upload");
const bcrypt = require("bcryptjs");

module.exports = {
  Mutation: {
    createUser: async (root, args, { req }, info) => {
      let { username, password, email, image } = args;
      let data = {
        username,
        email: email,
        password: await bcrypt.hash(password, 12),
      };
      const validationresponse = await userValidator.validate(data);
      if (validationresponse.error) {
        throw validationresponse.error;
      }
      let userA = await User.findOne({ username: username });
      if (userA) {
        throw new Error("User with same username already exists");
      }
      let userB = await User.findOne({ email: email });
      if (userB) {
        throw new Error("User with same email already exists");
      }
      if (image) {
        data["imageURL"] = await upload(image, "images");
      }
      const user = new User(data);
      return await user.save();
    },
    updateUser: async (root, args, { req }, info) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      let { id, username, email, image } = args;
      if (req.userID != id && !req.isAdmin) {
        throw new Error("Unauthorized");
      }
      let oldData = await (await User.findById(id)).toJSON();
      if (oldData) {
        let data = {};
        if (username) {
          let userA = await User.findOne({ username: username });
          if (userA) {
            throw new Error("User with same username already exists");
          }
          data["username"] = username;
        } else {
          data["username"] = oldData["username"];
        }
        if (email) {
          let userB = await User.findOne({ email: email });
          if (userB) {
            throw new Error("User with same email already exists");
          }
          data["email"] = email;
        } else {
          data["email"] = oldData["email"];
        }
        data["password"] = oldData["password"];
        const validationresponse = await userValidator.validate(data);
        if (validationresponse.error) {
          throw validationresponse.error;
        }
        if (image) {
          if (oldData["imageURL"]) {
            await removeFile(oldData["imageURL"]);
          }
          data["imageURL"] = await upload(image, "images");
        }
        await User.findByIdAndUpdate(id, { $set: data });
        return await User.findById(id);
      } else {
        throw new error("User Not Found");
      }
    },
    updatePassword: async (root, args, { req }, info) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      let { id, oldPassword, newPassword } = args;
      if (req.userID != id && !req.isAdmin) {
        throw new Error("Unauthorized");
      }
      let user = await User.findById(id);
      if (!user) {
        throw new Error("User not Found");
      }
      if (!(await bcrypt.compare(oldPassword, user.password))) {
        throw new Error("Incorrect old password");
      }
      if (newPassword == "") {
        throw new Error("New password can't be empty");
      }
      user.findByIdAndUpdate(id, {
        $set: { password: await bcrypt.hash(password, 12) },
      });
      return await User.findById(id);
    },
    deleteUser: async (root, args, { req }, info) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      let { id } = args;
      if (req.userID != id && !req.isAdmin) {
        throw new Error("Unauthorized");
      }
      const data = (await User.findById(id)).toJSON();
      if (data.imageURL) {
        await removeFile(data.imageURL);
      }
      return await User.findByIdAndRemove(id);
    },
  },
};

const removeFile = (filePath) => {
  filePath = path.join(__dirname, "../../../", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
