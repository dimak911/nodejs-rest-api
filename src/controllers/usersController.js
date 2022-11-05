const { duplicateEmailError } = require("../helpers/errors");
const { registerUser } = require("../models/users");

const registerUserController = async (req, res, next) => {
  const newUserData = req.body;

  const createdUser = await registerUser(newUserData);

  if (!createdUser) throw duplicateEmailError;

  res.status(201).json(createdUser);
};

module.exports = {
  registerUserController,
};
