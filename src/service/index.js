const Contact = require("./schemas/contact");

const getAllContactsDb = async () => {
  return Contact.find({});
};

const getContactByIdDb = (id) => {
  return Contact.findOne({ _id: id });
};

const createContactDb = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContactDb = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContactDb = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAllContactsDb,
  getContactByIdDb,
  createContactDb,
  updateContactDb,
  removeContactDb,
};
