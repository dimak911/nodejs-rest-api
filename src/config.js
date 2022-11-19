require("dotenv").config();

const { PORT = 3000, DB_HOST, DB_HOST_TEST, SECRET } = process.env;

module.exports = {
  PORT,
  DB_HOST,
  SECRET,
  DB_HOST_TEST,
};
