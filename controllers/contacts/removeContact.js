const { Contact } = require('../../models/contact');

const removeContact=async (req, res, next) => {
    const deleteContact = await Contact.findByIdAndRemove(req.params.id);
  if (!deleteContact) {
    next(createError(404, 'Not found'));
  }
    res.status(200).json({ message: 'contact deleted' });
}

module.exports = removeContact;
