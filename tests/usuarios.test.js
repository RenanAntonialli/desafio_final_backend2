const request = require('supertest');
const app = require('../app');
let token;

beforeAll(async () => {
  await request(app).post('/usuarios').send({ usuario: 'user2', senha: 'abc123' });
  const res = await request(app).post('/login').send({ usuario: 'user2', senha: 'abc123' });
  token = res.body.token;
});

describe('Usuários', () => {
  it('Lista usuários autenticado', async () => {
    const res = await request(app).get('/usuarios').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});