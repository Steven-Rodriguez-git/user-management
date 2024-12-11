import request from 'supertest';
import app from '../src/index.js';

describe('Auth Endpoints', () => {

  it('Debería registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'arroz@example.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Usuario registrado con éxito.');
  });

  it('Debería hacer login correctamente', async () => {

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('No debería hacer login con credenciales inválidas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpass'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Credenciales inválidas.');
  });

});
