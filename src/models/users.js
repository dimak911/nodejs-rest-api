const User = require("../models/schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const gravatar = require("gravatar");

const registerUser = async ({ email, password }) => {
  const hashPassword = await bcrypt.hash(password, 10);

  const createdUser = await User.create({
    email,
    password: hashPassword,
    avatarURL: gravatar.url(email, { protocol: "https" }),
  }).catch(() => {
    return null;
  });

  if (!createdUser) return null;

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
    id: currentUser._id,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: "1w" });

  const user = {
    token,
    user: { email: currentUser.email, subscription: currentUser.subscription },
  };

  return user;
};

const changeUserSubscription = async (subscription, _id) => {
  const changedUser = await User.findByIdAndUpdate(
    { _id },
    { subscription },
    {
      returnOriginal: false,
    }
  );

  return changedUser.subscription;
};

const changeUserAvatar = async (avatar, _id) => {
  const changedUser = await User.findByIdAndUpdate(
    { _id },
    { avatarURL: avatar },
    {
      returnOriginal: false,
    }
  );

  return changedUser.avatarURL;
};

module.exports = {
  registerUser,
  loginUser,
  changeUserSubscription,
  changeUserAvatar,
};
