const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
} = require("../../controllers/contactsController");
const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.post("/", addContactValidation, asyncWrapper(addContactController));

router.delete("/:contactId", asyncWrapper(deleteContactController));

router.put(
  "/:contactId",
  updateContactValidation,
  asyncWrapper(updateContactController)
);

module.exports = router;
