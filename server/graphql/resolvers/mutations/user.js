const User = require("../../../models/User");
const userValidator = require("../../validators/userValidators");
const path = require("path");
const fs = require("fs");
const upload = require("../../upload/upload");
const bcrypt = require("bcryptjs");

module.exports = {
  Mutation: {
    createUser: async (root, args, { req }, info) => {
      let { firstName, lastName, username, password, email, image } = args;
      let data = {
        firstName: firstName,
        lastName: lastName,
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
      let { id, firstName, lastName, username, email, image } = args;
      if (req.userID != id) {
        throw new Error("Unauthorized");
      }
      let oldData = await (await User.findById(id)).toJSON();
      if (oldData) {
        let data = {};
        data["firstName"] = firstName ? firstName : oldData["firstName"];
        data["lastName"] = lastName ? lastName : oldData["lastName"];
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
    deleteUser: async (root, args, { req }, info) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      let { id } = args;
      if (req.userID != id) {
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
