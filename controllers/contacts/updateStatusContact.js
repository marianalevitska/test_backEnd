const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');

const updateStatusContact = async (req, res, next) => {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!contact) {
        next(createError(404, 'Not Found'));
    }
    res.status(200).json(contact);
}

module.exports = updateStatusContact;