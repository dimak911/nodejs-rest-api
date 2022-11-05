const express = require("express");
const { registerUserController } = require("../../controllers/usersController");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { validationBody } = require("../../middlewares/validationMiddleware");
const { schemaPostUser } = require("../../schemas/usersSchemas");

const router = express.Router();

router.post(
  "/signup",
  validationBody(schemaPostUser),
  asyncWrapper(registerUserController)
);

module.exports = router;
