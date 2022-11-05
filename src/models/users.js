const User = require("../models/schemas/user");
const bcrypt = require("bcrypt");

const registerUser = async ({ email, password }) => {
  const hashPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    email,
    password: hashPassword,
  }).catch(() => {
    return null;
  });

  const user = {
    user: {
      email: createdUser.email,
      subscription: createdUser.subscription,
    },
  };

  return user;
};

module.exports = {
  registerUser,
};
