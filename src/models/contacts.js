const {
  getAllContactsDb,
  getContactByIdDb,
  createContactDb,
  updateContactDb,
  removeContactDb,
} = require("../service");

const listContacts = async () => {
  try {
    const contacts = await getAllContactsDb();

    return contacts;
  } catch (err) {
    console.error(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await getContactByIdDb(contactId);

    console.log("contact by id: ", contact);

    return contact;
  } catch (err) {
    console.error(err.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = await createContactDb(body);

    return newContact;
  } catch (err) {
    console.error(err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await updateContactDb(contactId, body);

    return updatedContact;
  } catch (err) {
    console.error(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const result = await removeContactDb(contactId);

    return result;
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
