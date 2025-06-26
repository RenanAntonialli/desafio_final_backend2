const jwt = require('jsonwebtoken');
const pool = require('../configs/db');

module.exports = async function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  try {
    // Verifica se o token está na blacklist (logout)
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE token = ?', [token]);
    if (!rows.length) return res.status(401).json({ message: 'Token inválido/deslogado' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};