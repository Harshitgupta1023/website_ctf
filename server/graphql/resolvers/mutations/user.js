const User = require("../../../models/User");
const Problem = require("../../../models/Problem");
const jwt = require("jsonwebtoken");
const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = require("../../../config");
const userValidator = require("../../validators/userValidators");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const upload = require("../../upload/upload");
const bcrypt = require("bcryptjs");
const sendMail = require("../../../middleware/sendGrid"); //Now using Send Grid, replaced Gmail API
const {
  GMAIL_CLIENT_ID,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} = require("../../../config");
const { OAuth2Client } = require("google-auth-library");
module.exports = {
  Mutation: {
    createUser: async (root, args, { req, res }, info) => {
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
        var cr = new Date(userA.createdAt);
        if (
          userA.verified ||
          cr.getTime() + 7 * 3600 * 24 * 1000 > Date.now()
        ) {
          throw new Error("User with same username already exists");
        } else {
          await User.findOneAndRemove({ username: username });
        }
      }
      let userB = await User.findOne({ email: email });
      if (userB) {
        var cr = new Date(userB.createdAt);
        if (
          userB.verified ||
          cr.getTime() + 7 * 3600 * 24 * 1000 > Date.now()
        ) {
          throw new Error("User with same email already exists");
        } else {
          await User.findOneAndRemove({ email: email });
        }
      }
      if (image) {
        data["imageURL"] = await upload(image, "images");
      }
      const user = new User(data);
      user.save();
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
    updateUser: async (root, args, { req, res }, info) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated! Please Login");
      }
      let { id, username, email, image } = args;
      if (req.userID != id && !req.isAdmin) {
        throw new Error("Unauthorized");
      }
      let oldData = await User.findById(id);
      if (oldData) {
        let data = {};
        if (username && username != oldData["username"]) {
          let userA = await User.findOne({ username: username });
          if (userA) {
            throw new Error(
              "User with the requested new username already exists. Try Something else"
            );
          }
          data["username"] = username;
        } else {
          data["username"] = oldData["username"];
        }
        if (email && email != oldData["email"]) {
          let userB = await User.findOne({ email: email });
          if (userB) {
            throw new Error(
              "User with the requested new email already exists. Try something else"
            );
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
        if (data["email"] !== oldData["email"]) {
          data["verified"] = false;
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
    updatePassword: async (root, args, { req, res }, info) => {
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
      user.password = await bcrypt.hash(newPassword, 12);
      await user.save();
      return user;
    },
    deleteUser: async (root, args, { req, res }, info) => {
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
    login: async (root, args, { req, res }, info) => {
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
    sendVerificationOTP: async (root, args, { req, res }, info) => {
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
    sendForgotPassOTP: async (root, args, { req, res }, info) => {
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
    verifyAccount: async (root, args, { req, res }, info) => {
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
    forgotPassword: async (root, args, { req, res }, info) => {
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
          const token = jwt.sign({ userData: user }, JWT_KEY, {
            expiresIn: "1h",
          });
          return { userID: user.id, token: token, tokenExpiration: 1 };
        }
      }
      throw new Error("OTP doesn't match");
    },
    googleLogin: async (root, args, { req, res }, info) => {
      if (req.isAuth) {
        throw new Error("User Already Logged In");
      }
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
        let user = await User.findOne({ email: email });
        if (!user) {
          let userA = await User.findOne({ username: username });
          let userDetails = {
            username: username,
            password: await bcrypt.hash(generateRandomString(8), 12),
            // Here we have just created a random string and hashed it. No copy of the password is retained. As this user will alwas use google as sign in medium.
            // If somehow user gets locked. There's no way to regain the account access
            email: email,
            verified: true,
            imageURL: picture,
          };
          if (userA) {
            userDetails["username"] = username + generateRandomString(4);
          }
          user = new User(userDetails);
          await user.save();
        } else {
          if (!user.verified) {
            await User.findOneAndDelete({ email: email });
            let userDetails = {
              username: username,
              password: await bcrypt.hash(generateRandomString(8), 12),
              email: email,
              verified: true,
              imageURL: picture,
            };
            user = new User(userDetails);
            user.save();
          }
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
      }
    },
    githubLogin: async (root, args, { req, res }, info) => {
      if (req.isAuth) {
        throw new Error("User Already Logged In");
      }
      const { code } = args;
      const body = {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code: code,
      };
      const opts = { headers: { accept: "application/json" } };
      const resp = await axios.post(
        `https://github.com/login/oauth/access_token`,
        body,
        opts
      );
      const token = resp.data["access_token"];
      const githubRes = await axios.get("https://api.github.com/user", {
        headers: { Authorization: "token " + token },
      });
      const userData = githubRes.data;
      if (!userData.email) {
        throw new Error(
          "Email not public. Please make your email public from Github account settings to use this method of SignUp"
        );
      }
      let user = await User.findOne({
        email: userData.email,
      });
      if (!user) {
        let userA = await User.findOne({ username: userData.login });
        let userDetails = {
          username: userData.login,
          password: await bcrypt.hash(generateRandomString(8), 12),
          email: userData.email,
          verified: true,
          imageURL: userData.avatar_url,
        };
        if (userA) {
          userDetails["username"] = userData.login + generateRandomString(4);
        }
        user = new User(userDetails);
        await user.save();
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
    makeSubmission: async (root, args, { req, res }, info) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated! Please Login");
      }
      let { id, problemID, submission } = args;
      if (req.userID != id && !req.isAdmin) {
        throw new Error("Unauthorized");
      }
      let user = await User.findById(id);
      if (!user.verified) {
        throw new Error(
          "You need to verify your email address before making any submissions"
        );
      }
      let prob = await Problem.findById(problemID);
      prob.submissions += 1;
      if (await bcrypt.compare(submission.trim(), prob.solution)) {
        if (!user.solvedProblems.includes(problemID)) {
          user.solvedProblems.push(problemID);
          user.points += prob.points;
        }
        prob.accepted += 1;
        await prob.save();
        await user.save();
      } else {
        await prob.save();
        throw new Error("Wrong Answer");
      }
      return user;
    },
    logOut: async (root, args, { req, res }, info) => {
      if (!req.isAuth) {
        throw new Error("Unauthenticated! Please Login");
      }
      let { id } = args;
      if (req.userID != id && !req.isAdmin) {
        throw new Error("Unauthorized");
      }
      const user = await User.findById(id);
      user.tokenVersion += 1;
      await user.save();
      return "Successfully Logged Out";
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
