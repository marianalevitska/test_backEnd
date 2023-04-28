const { User } = require("../../models/user");

const { createError, sendMail } = require("../../helpers");

const reVerify = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404, "User not found");
  }
  if (user.verify) {
    throw createError(409, "User already verified");
  }
  const verificationToken = user.verificationToken;
  const mail = {
    to: email,
    subject: "Verify your email",
    html: '<p>Verify your account</p>',
  };
  await sendMail(mail);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = reVerify;