const { google } = require("googleapis");
const nodeMailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();

const REDIRECT_URI = "https://developers.google.com/oauthplayground/";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

module.exports = async (to, subject, body) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "seekhoctf@gmail.com",
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: "SeekhoCTF<seekhoctf@gmail.com>",
      to: to,
      subject: subject,
      text: body,
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    return err;
  }
};
