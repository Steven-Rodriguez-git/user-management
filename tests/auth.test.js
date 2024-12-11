import request from "supertest";
import app from "../src/index.js";
import sequelize from "../src/config/db.js";

describe("Auth Endpoints", () => {

    beforeAll(async () => {
      await sequelize.sync({ force: true });
    });

    afterAll(async () => {
      await sequelize.close();
    });

  it("Debería registrar un nuevo usuario", async () => {
    const res = await request(app).post("/auth/register").send({
      email: "arroz@example.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Usuario registrado con éxito.");
  });


  it("Debería hacer login correctamente", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "arroz@example.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

   it("Debería tirar un error si el usuario existe", async () => {
     const res = await request(app).post("/auth/register").send({
       email: "arroz@example.com",
       password: "123456",
     });

     expect(res.statusCode).toBe(400);
     expect(res.body).toHaveProperty("error", "El usuario ya existe.");
   });

  it("No debería hacer login con credenciales inválidas", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "arroz@example.com",
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Credenciales inválidas.");
  });

  it("No debería hacer login si el usuario no existe", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "usuario@quenoexiste.com",
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Usuario no encontrado.");
  });
});
