// tests/health.test.js
import request from "supertest";
import { jest } from "@jest/globals";
import app from "../src/index.js";
import sequelize from "../src/config/db.js";
import User from "../src/models/user.js";

describe("Health Endpoint", () => {

  beforeAll(async () => {
    await sequelize.sync({ force: true }); 
  });
  afterAll(async () => {
    await sequelize.close();
  });

  it("Debería responder con estado ok y un timestamp", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("timestamp");
    expect(res.body).toHaveProperty("dbConnection", "ok");
  });

  it("Debería manejar errores y responder con estado error si la DB falla", async () => {
    const originalAuthenticate = sequelize.authenticate;
    sequelize.authenticate = jest.fn().mockImplementation(() => {
      throw new Error("Falla en la conexión a la DB");
    });

    const res = await request(app).get("/health");
    expect(res.statusCode).toEqual(503);
    expect(res.body).toHaveProperty("status", "error");
    expect(res.body).toHaveProperty("dbConnection", "fail");

    sequelize.authenticate = originalAuthenticate;
  });
});
