const pool = require('../configs/db');
const bcrypt = require('bcrypt');

exports.createUsuario = async (data) => {
  const { usuario, senha } = data;
  const [existe] = await pool.query('SELECT id FROM usuarios WHERE usuario = ?', [usuario]);
  if (existe.length) return null;
  const hash = await bcrypt.hash(senha, 10);
  const [result] = await pool.query(
    'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)',
    [usuario, hash]
  );
  return { id: result.insertId, usuario };
};

exports.getAllUsuarios = async () => {
  const [rows] = await pool.query('SELECT id, usuario FROM usuarios');
  return rows;
};

exports.getUsuarioByUsername = async (usuario) => {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
  return rows[0];
};

exports.setUserToken = async (id, token) => {
  await pool.query('UPDATE usuarios SET token = ? WHERE id = ?', [token, id]);
};