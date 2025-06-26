const pool = require('../configs/db');

exports.getAllProdutos = async () => {
  const [rows] = await pool.query('SELECT * FROM produtos');
  return rows;
};

exports.getProdutoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM produtos WHERE id = ?', [id]);
  return rows[0];
};

exports.createProduto = async (data) => {
  const { nome, descricao, preco, data_atualizado } = data;
  const [result] = await pool.query(
    'INSERT INTO produtos (nome, descricao, preco, data_atualizado) VALUES (?, ?, ?, ?)',
    [nome, descricao, preco, data_atualizado]
  );
  return { id: result.insertId, ...data };
};

exports.updateProduto = async (id, data) => {
  const { nome, descricao, preco, data_atualizado } = data;
  const [result] = await pool.query(
    'UPDATE produtos SET nome=?, descricao=?, preco=?, data_atualizado=? WHERE id = ?',
    [nome, descricao, preco, data_atualizado, id]
  );
  if (result.affectedRows === 0) return null;
  return { id: Number(id), ...data };
};

exports.deleteProduto = async (id) => {
  const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
  return result.affectedRows > 0;
};