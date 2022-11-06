const customError = ({ status, message }) => {
  const error = new Error(message);
  error.status = status;

  return error;
};

const notFoundError = new Error("Not found");
notFoundError.status = 404;

const duplicateEmailError = new Error("Email in use");
duplicateEmailError.status = 409;

module.exports = {
  notFoundError,
  duplicateEmailError,
  customError,
};
