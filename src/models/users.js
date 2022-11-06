const User = require("../models/schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_WORD } = require("../config");

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

const loginUser = async ({ email, password }) => {
  const currentUser = await User.findOne({ email });

  if (!currentUser) return null;

  const isPasswordValid = await bcrypt.compare(password, currentUser.password);

  if (!isPasswordValid) return null;

  const payload = {
    email: currentUser.email,
    subscription: currentUser.subscription,
  };
  const token = jwt.sign(payload, SECRET_WORD, { expiresIn: "1w" });

  const user = {
    token,
    user: payload,
  };

  return user;
};

module.exports = {
  registerUser,
  loginUser,
};
