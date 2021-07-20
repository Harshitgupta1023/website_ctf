const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (to, subject, message) => {
  const msg = {
    to: to,
    from: "SeekhoCTF<seekhoctf@gmail.com>",
    subject: subject,
    text: message,
    html: message,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
