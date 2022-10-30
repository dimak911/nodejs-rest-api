const Contact = require("./schemas/contact");

const getAllContactsDb = async () => {
  return Contact.find({});
};

const getContactByIdDb = (id) => {
  return Contact.findOne({ _id: id });
};

const createContactDb = ({ name, email, phone, favorite = false }) => {
  return Contact.create({ name, email, phone, favorite });
};

const updateContactDb = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const updateStatusContactDb = (id, fields) => {
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
  updateStatusContactDb,
};
