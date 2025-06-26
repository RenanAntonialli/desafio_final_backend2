const usuariosService = require('../services/usuariosService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../configs/db');

exports.login = async (req, res) => {
  const { usuario, senha } = req.body;
  const user = await usuariosService.getUsuarioByUsername(usuario);
  if (!user || !(await bcrypt.compare(senha, user.senha))) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }
  const token = jwt.sign({ id: user.id, usuario: user.usuario }, process.env.JWT_SECRET, { expiresIn: '2h' });
  await usuariosService.setUserToken(user.id, token);
  res.json({ token });
};

exports.logout = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  // Remove o token do usuário no banco (blacklist simples)
  await pool.query('UPDATE usuarios SET token = NULL WHERE token = ?', [token]);
  res.json({ message: 'Logout efetuado com sucesso' });
};