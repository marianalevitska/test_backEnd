const { Contact } = require('../../models/contact');


const createContact = async (req, res, next) => {
   const { _id: owner } = req.user;
   const contact = await Contact.create({
      ...req.body,
      owner
   });
   res.status(201).json(contact);

}

module.exports = createContact;