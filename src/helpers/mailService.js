const nodemailer = require("nodemailer");
const { EMAIL_SENDER, EMAIL_LOGIN, EMAIL_PASSWORD } = require("../config");

const sendVerificationMail = async (email, verificationToken) => {
  const config = {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_LOGIN,
      pass: EMAIL_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const emailOptions = {
    from: EMAIL_SENDER,
    to: email,
    subject: "Please verify your email",
    text: `Hello dear user. Open this link http://localhost:3000/api/users/verify/${verificationToken}" to verify your email.`,
    html: `<b>Hello dear user</b></br>
          <p>Click <a href="http://localhost:3000/api/users/verify/${verificationToken}">here</a> to verify your email.</p>`,
  };

  const info = await transporter.sendMail(emailOptions);

  console.log("Message sent: %s", info.messageId);
};

module.exports = {
  sendVerificationMail,
};
