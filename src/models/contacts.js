const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

const contactPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactPath, "utf8");
    const parsedContacts = JSON.parse(contacts);

    return parsedContacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

    return contact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.findIndex((contact) => contact.id === contactId);

    if (contact === -1) return false;

    contacts.splice(contact, 1);

    await fs.writeFile(contactPath, JSON.stringify(contacts), "utf8");

    return true;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const id = uuid();
    const newContact = { ...body, id };

    contacts.push(newContact);

    await fs.writeFile(contactPath, JSON.stringify(contacts), "utf8");

    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const updateIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (updateIndex === -1) return false;

    contacts[updateIndex] = { ...contacts[updateIndex], ...body };

    await fs.writeFile(contactPath, JSON.stringify(contacts), "utf8");

    return contacts[updateIndex];
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
