const app = require("../src/app");
const mongoose = require("mongoose");
const { DB_HOST } = require("../src/config");
const request = require("supertest");

const baseURL = "http://localhost:3002";

describe("POST /login", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(DB_HOST);
      console.log("Database connection successful");

      app.listen(3002, () => {
        console.log("Server running. Use our API on port: 3002");
      });
    } catch (err) {
      console.error("Failed to start server with error: ", err.message);
      process.exit(1);
    }
  });

  afterAll(() => {
    mongoose.connection.close();

    function gracefulshutdown() {
      console.log("Shutting down");
      app.close(() => {
        console.log("HTTP server closed.");

        process.exit(0);
      });
    }

    process.on("SIGTERM", gracefulshutdown);
  });

  const user = {
    email: "test4@mail.com",
    password: "123456",
  };

  it("success login", async () => {
    const response = await request(baseURL).post("/api/users/login").send(user);

    expect(response.status).toBe(200);
  });
});
