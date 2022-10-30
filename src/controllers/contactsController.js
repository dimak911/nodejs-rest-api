const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContactsController = async (req, res, next) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);

  if (!contact) return res.status(404).json({ message: "Not found" });

  res.status(200).json(contact);
};

const addContactController = async (req, res, next) => {
  const newContactData = req.body;

  const newCreatedContact = await addContact(newContactData);

  res.status(201).json(newCreatedContact);
};

const deleteContactController = async (req, res, next) => {
  const contactRemoved = await removeContact(req.params.contactId);

  if (!contactRemoved) return res.status(404).json({ message: "Not found" });

  res.status(200).json({ message: "Contact deleted" });
};

const updateContactController = async (req, res, next) => {
  const updatedContact = await updateContact(req.params.contactId, req.body);

  if (!updatedContact) return res.status(404).json({ message: "Not found" });

  res.status(200).json(updatedContact);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
};
