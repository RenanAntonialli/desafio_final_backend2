const pool = require('../configs/db');

exports.getAllClientes = async () => {
  const [rows] = await pool.query('SELECT * FROM clientes');
  return rows;
};

exports.getClienteById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
  return rows[0];
};

exports.createCliente = async (data) => {
  const { nome, sobrenome, email, idade } = data;
  const [result] = await pool.query(
    'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
    [nome, sobrenome, email, idade]
  );
  return { id: result.insertId, ...data };
};

exports.updateCliente = async (id, data) => {
  const { nome, sobrenome, email, idade } = data;
  const [result] = await pool.query(
    'UPDATE clientes SET nome=?, sobrenome=?, email=?, idade=? WHERE id = ?',
    [nome, sobrenome, email, idade, id]
  );
  if (result.affectedRows === 0) return null;
  return { id: Number(id), ...data };
};

exports.deleteCliente = async (id) => {
  const [result] = await pool.query('DELETE FROM clientes WHERE id = ?', [id]);
  return result.affectedRows > 0;
};