const usuariosService = require('../services/usuariosService');

exports.create = async (req, res) => {
  const novo = await usuariosService.createUsuario(req.body);
  if (!novo) return res.status(400).json({ message: 'Usuário já existe' });
  res.status(201).json(novo);
};

exports.getAll = async (req, res) => {
  const usuarios = await usuariosService.getAllUsuarios();
  res.json(usuarios);
};