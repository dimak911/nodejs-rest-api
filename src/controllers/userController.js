const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv } = require("uuid");
const { customError } = require("../helpers/errors");
const {
  changeUserSubscription,
  changeUserAvatar,
  verifyUser,
  checkVerification,
} = require("../models/users");
const Jimp = require("jimp");
const storeImage = path.join(process.cwd(), "public/avatars");

const changeUserSubscriptionController = async (req, res, next) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const newSubscription = await changeUserSubscription(subscription, _id);

  res.status(200).json({ subscription: newSubscription });
};

const changeUserAvatarController = async (req, res, next) => {
  if (!req.file)
    throw customError({
      status: 400,
      message: "Wrong file type. Only .jpeg, .jpg or .png are allowed.",
    });

  const { path: temporaryFilePath, originalname } = req.file;
  const { _id } = req.user;
  const newFileName = uuidv() + path.extname(originalname);
  const newFilePath = path.join(storeImage, newFileName);

  const file = await Jimp.read(temporaryFilePath);
  file.resize(250, 250).write(temporaryFilePath);

  await fs.rename(temporaryFilePath, newFilePath);

  const avatarURL = path.join("avatars", newFileName);

  const newAvatar = await changeUserAvatar(avatarURL, _id);

  res.json({
    status: 200,
    newAvatar,
  });
};

const verificationUserController = async (req, res) => {
  const { verificationToken } = req.params;

  const verifiedUser = await verifyUser(verificationToken);

  if (!verifiedUser)
    throw customError({ status: 404, message: "User not found" });

  res.status(200).json({ message: "Verification successful" });
};

const resendVerificationUserController = async (req, res) => {
  const user = await checkVerification(req.body);

  if (!user)
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });

  res.status(200).json({
    message: "Verification email sent",
  });
};

module.exports = {
  changeUserSubscriptionController,
  changeUserAvatarController,
  verificationUserController,
  resendVerificationUserController,
};
