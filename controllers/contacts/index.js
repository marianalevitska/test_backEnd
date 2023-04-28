const getContactsList = require('./getContactsList');
const getContactById = require('./getContactById');
const createContact = require('./createContact');
const removeContact = require('./removeContact');
const updateContact = require('./updateContact');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
    getContactsList,
    getContactById,
    createContact,
    removeContact,
    updateContact,
    updateStatusContact,
}