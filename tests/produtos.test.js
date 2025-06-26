const request = require('supertest');
const app = require('../app');

describe('Produtos', () => {
  it('Permite listar produtos sem autenticação', async () => {
    const res = await request(app).get('/produtos');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Valida produto ao criar', async () => {
    const res = await request(app).post('/produtos').send({
      nome: 'Produto Teste',
      descricao: 'Teste produto',
      preco: 50,
      data_atualizado: '2024-06-20T13:00:00'
    });
    expect(res.status).toBe(201);
    expect(res.body.nome).toBe('Produto Teste');
  });
});