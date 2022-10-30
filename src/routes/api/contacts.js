const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  changeFavoriteController,
} = require("../../controllers/contactsController");
const {
  addContactValidation,
  updateContactValidation,
  changeFavoriteValidation,
} = require("../../middlewares/validationMiddleware");

const router = express.Router();

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.post("/", addContactValidation, asyncWrapper(addContactController));

router.delete("/:contactId", asyncWrapper(deleteContactController));

router.patch(
  "/:contactId/favorite",
  changeFavoriteValidation,
  asyncWrapper(changeFavoriteController)
);

router.put(
  "/:contactId",
  updateContactValidation,
  asyncWrapper(updateContactController)
);

module.exports = router;
