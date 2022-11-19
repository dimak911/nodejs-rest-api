const app = require("../src/app");
const mongoose = require("mongoose");
const { DB_HOST_TEST } = require("../src/config");
const request = require("supertest");
const User = require("../src/models/schemas/user");

const correctUser = {
  email: "test1@mail.com",
  password: "123456",
};

const wrongEmailUser = {
  email: "test1@com",
  password: "123456",
};

const shortPassUser = {
  email: "test1@mail.com",
  password: "12345",
};

describe("signup", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("success signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send(correctUser);

    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({
      user: { email: "test1@mail.com", subscription: "starter" },
    });
  });

  it("wrong email signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send(wrongEmailUser);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      message: '"email" must be a valid email',
    });
  });

  it("short password signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send(shortPassUser);

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      message: '"password" length must be at least 6 characters long',
    });
  });

  it("only uniq email signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send(correctUser);

    expect(response.status).toBe(409);
    expect(response.body).toStrictEqual({ message: "Email in use" });
  });
});

describe("login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
  });

  it("success login", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(correctUser);

    expect(response.status).toBe(200);
  });
});
