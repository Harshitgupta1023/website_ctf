const { google } = require("googleapis");
const nodeMailer = require("nodemailer");

const {
  GMAIL_CLIENT_SECRET,
  GMAIL_CLIENT_ID,
  OAUTH_REFRESH_TOKEN,
} = require("../config");
const REDIRECT_URI = "https://developers.google.com/oauthplayground/";

const oAuth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: OAUTH_REFRESH_TOKEN });

module.exports = async (to, subject, body) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "seekhoctf@gmail.com",
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
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
