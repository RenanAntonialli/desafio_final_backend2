const request = require('supertest');
const app = require('../app');
let token;

beforeAll(async () => {
  // Cria usuário e faz login
  await request(app).post('/usuarios').send({ usuario: 'teste', senha: '123456' });
  const res = await request(app).post('/login').send({ usuario: 'teste', senha: '123456' });
  token = res.body.token;
});

describe('Clientes', () => {
  it('Não permite acesso sem autenticação', async () => {
    const res = await request(app).get('/clientes');
    expect(res.status).toBe(401);
  });

  it('Cria cliente com autenticação', async () => {
    const res = await request(app)
      .post('/clientes')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Renan', sobrenome: 'Antonialli', email: 'renan@ex.com', idade: 30 });
    expect(res.status).toBe(201);
    expect(res.body.nome).toBe('Renan');
  });
});