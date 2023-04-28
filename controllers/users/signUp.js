const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const { createError,sendMail } = require('../../helpers');
const gravatar = require('gravatar');
const bson = require("bson-objectid");

const signUp = async (req,res,next) => {
    const { email, password, subscription='starter' } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, 'Email is already in use');
    };
    const hash = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = bson();

    const newUser = User.create({
        email,
        password: hash,
        subscription,
        avatarURL,
        verificationToken,
    });
    const mail = {
      to: email,
      subject: "Verify your account",
      html: `<a target='_blank' href='https://mondodb-project.herokuapp.com/${verificationToken}'>Click here to verify your account</a>`,
    };
    await sendMail(mail);
    res.status(200).json(email);
}

module.exports = signUp;