const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');

const updateContact=async (req, res, next) => {
    const contacts = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new:true
  });
  if (!contacts) {
    next(createError(404, 'Not found'));
  };
  res.status(200).json(contacts);
}

module.exports = updateContact;
