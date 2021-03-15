const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../../../config");
const userValidator = require("../../validators/userValidators");
const path = require("path");
const fs = require("fs");
const upload = require("../../upload/upload");
const bcrypt = require("bcryptjs");
const sendMail = require("../../../middleware/sendGrid"); //Now using Send Grid, replaced Gmail API

const {
  GMAIL_CLIENT_SECRET,
  GMAIL_CLIENT_ID,
  OAUTH_REFRESH_TOKEN,
} = require("../../../config");
const { OAuth2Client } = require("google-auth-library");

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
      console.log(user);
      const token = jwt.sign({ userData: user }, JWT_KEY, { expiresIn: "1h" });
      return { userID: user.id, token: token, tokenExpiration: 1 };
    },
    updateUser: async (root, args, { req }, info) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated! Please Login");
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
        for (i in data) {
          oldData[i] = data[i];
        }
        await oldData.save();
        return oldData;
      } else {
        throw new error("User Not Found");
      }
    },
    updatePassword: async (root, args, { req }, info) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated! Please Login");
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
      user.password = await bcrypt.hash(password, 12);
      await user.save();
      return user;
    },
    deleteUser: async (root, args, { req }, info) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated! Please Login");
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
    login: async (root, args, { req }, info) => {
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
    sendVerificationOTP: async (root, args, { req }, info) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated! Please Login");
      }
      let { id } = args;
      if (req.userID != id && !req.isAdmin) {
        throw new Error("Unauthorized");
      }
      let user = await User.findById(id);
      if (user.verified) {
        throw new Error("Already verified");
      }
      const curTime = Date.now();
      if (user.verificationOTP.code) {
        if (curTime > user.verificationOTP.expTime) {
          user.verificationOTP.code = generateOTP(8);
          user.verificationOTP.count = 0;
          user.verificationOTP.expTime = curTime + 24 * 60 * 60 * 1000;
        }
        if (user.verificationOTP.count >= 3) {
          throw new Error(
            "You have exceeded OTP generation limit for the day. Try again tommorow"
          );
        } else {
          user.verificationOTP.count += 1;
          user.verificationOTP.expTime = curTime + 24 * 60 * 60 * 1000;
        }
      } else {
        user.verificationOTP.code = generateOTP(8);
        user.verificationOTP.count = 1;
        user.verificationOTP.expTime = curTime + 24 * 60 * 60 * 1000;
      }
      sendMail(
        user.email,
        "Email Verification",
        "Hi " +
          user.username.bold() +
          ",<br>Your OTP for email verification is " +
          user.verificationOTP.code.toString().bold() +
          ". It will remain valid for 1 day."
      );
      await user.save();
      return user;
    },
    sendForgotPassOTP: async (root, args, { req }, info) => {
      let { username, email } = args;
      let user = await User.findOne({ username: username, email: email });
      if (!user) {
        throw new Error("User not found!");
      }
      if (!user.verified) {
        throw new Error("Account not verified. Contact support");
      }
      const curTime = Date.now();
      if (user.forgotPassOTP.code) {
        if (curTime > user.forgotPassOTP.expTime) {
          user.forgotPassOTP.code = generateOTP(8);
          user.forgotPassOTP.count = 0;
          user.forgotPassOTP.expTime = curTime + 24 * 60 * 60 * 1000;
        }
        if (user.forgotPassOTP.count >= 3) {
          throw new Error(
            "You have exceeded OTP generation limit for the day. Try again tommorow"
          );
        } else {
          user.forgotPassOTP.count += 1;
          user.forgotPassOTP.expTime = curTime + 24 * 60 * 60 * 1000;
        }
      } else {
        user.forgotPassOTP.code = generateOTP(8);
        user.forgotPassOTP.count = 1;
        user.forgotPassOTP.expTime = curTime + 24 * 60 * 60 * 1000;
      }
      sendMail(
        user.email,
        "Forgot Password OTP",
        "Hi " +
          user.username.bold() +
          ",<br>Your OTP for resetting your password is " +
          user.forgotPassOTP.code.toString().bold() +
          ". It will remain valid for 1 day."
      );
      await user.save();
      return user;
    },
    verifyAccount: async (root, args, { req }, info) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated! Please Login");
      }
      let { id, OTP } = args;
      if (req.userID != id && !req.isAdmin) {
        throw new Error("Unauthorized");
      }
      let user = await User.findById(id);
      if (user.verified) {
        throw new Error("Already Verified");
      }
      if (user.verificationOTP) {
        if (user.verificationOTP.code && user.verificationOTP.code === OTP) {
          user.verified = true;
          sendMail(
            user.email,
            "Email Verification",
            "Hi " +
              user.username.bold() +
              ",<br>Congratulations! Your account has been successfully verified."
          );
          user.verificationOTP.count = 0;
          user.verificationOTP.code = null;
          user.verificationOTP.expTime = null;
          await user.save();
          return user;
        }
      }
      throw new Error("OTP doesn't match");
    },
    forgotPassword: async (root, args, { req }, info) => {
      let { username, email, OTP, newPassword } = args;
      let user = await User.findOne({ username: username, email: email });
      if (!user) {
        throw new Error("User not found");
      }
      if (user.forgotPassOTP) {
        if (user.forgotPassOTP.code && user.forgotPassOTP.code === OTP) {
          user.password = await bcrypt.hash(newPassword, 12);
          user.forgotPassOTP.count = 0;
          sendMail(
            user.email,
            "Forgot Password OTP",
            "Hi " +
              user.username.bold() +
              ",<br>Congratulations! Your password was changed successfully."
          );
          user.forgotPassOTP.code = null;
          user.forgotPassOTP.expTime = null;
          await user.save();
          return user;
        }
      }
      throw new Error("OTP doesn't match");
    },
    googleLogin: async (root, args, { req }, info) => {
      const { id_token } = args;
      const client = new OAuth2Client(GMAIL_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: GMAIL_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (payload) {
        const { iss, aud, email, exp, picture } = payload;
        if (
          iss !== "accounts.google.com" &&
          iss !== "https://accounts.google.com"
        ) {
          throw new Error("Malicious Request");
        }
        if (aud !== GMAIL_CLIENT_ID) {
          throw new Error("Malicious Request");
        }
        if (exp > Date.now()) {
          throw new Error("Token Expired");
        }
        const username = email.split("@")[0];
        let user = await User.findOne({ username: username, email: email });
        if (!user) {
          user = new User({
            username: username,
            password: await bcrypt.hash(generateRandomString(8), 12),
            email: email,
            verified: true,
            imageURL: picture,
          });
          await user.save();
        }
        console.log(user);
        const token = jwt.sign({ userData: user }, JWT_KEY, {
          expiresIn: "1h",
        });
        return { userID: user.id, token: token, tokenExpiration: 1 };
      }
    },
  },
};

const generateOTP = (length) => {
  var out = 0;
  for (var i = 0; i < length; i++) {
    out += Math.pow(10, i) * Math.round(Math.random() * 10);
  }
  return out;
};
const removeFile = (filePath) => {
  if (filePath[0] == "h") {
    return; //Since, the paths beginning with https are on google servers. So, no need to unlink them
  }
  filePath = path.join(__dirname, "../../../", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
