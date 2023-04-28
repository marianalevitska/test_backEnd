const { isValidObjectId } = require('mongoose');
const { createError } = require('../helpers');

const isValidId = (req, _, next) => {
    const {id} = req.params;
    const isVerify = isValidObjectId(id);
    if (!isVerify) {
        next(createError(400,'${id} is not verified id'));
    }
    next();
}

module.exports = isValidId;