const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');


const getContactById = async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact){
    next(createError(404, 'Not Found'));
  }
  res.status(200).json(contact);

}

module.exports = getContactById;