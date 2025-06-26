const request = require('supertest');
const app = require('../app');

describe('Autenticação', () => {
  it('Falha login com credencial errada', async () => {
    const res = await request(app).post('/login').send({ usuario: 'naoexiste', senha: 'errada' });
    expect(res.status).toBe(401);
  });

  it('Efetua login e logout', async () => {
    await request(app).post('/usuarios').send({ usuario: 'logoutuser', senha: 'logout123' });
    const resLogin = await request(app).post('/login').send({ usuario: 'logoutuser', senha: 'logout123' });
    expect(resLogin.body.token).toBeTruthy();

    const resLogout = await request(app).post('/logout').set('Authorization', `Bearer ${resLogin.body.token}`);
    expect(resLogout.status).toBe(200);
  });
});