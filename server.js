const app = require("./src/app");
const { connectMongoDb } = require("./src/db/connection");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectMongoDb();

    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (err) {
    console.error("Failed to start server with error: ", err.message);
  }
})();
