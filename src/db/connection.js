const mongoose = require("mongoose");

require("dotenv").config();

const uriDb = process.env.DB_HOST;

const connectMongoDb = async () => {
  try {
    await mongoose.connect(uriDb);
    console.log("Database connection successful");
  } catch (err) {
    console.error(`Database connection failed: ${err.message}`);
    process.exit(1);
  }
};

module.exports = {
  connectMongoDb,
};
