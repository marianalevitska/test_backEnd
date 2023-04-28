const { User } = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { createError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        next(createError(401, 'Invalid password or email'));
    };
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        next(createError(401, 'Invalid password or email'));
    };
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: '1h',
    });
    await User.findByIdAndUpdate(user._id, {token});
    res.status(201).json(token);
}

module.exports = signIn;