const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = require("../config");
sgMail.setApiKey(SENDGRID_API_KEY);

module.exports = (to, subject, message) => {
  const msg = {
    to: to,
    from: "SeekhoCTF<seekhoctf@gmail.com>",
    subject: subject,
    text: message,
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
