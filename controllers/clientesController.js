const clientesService = require('../services/clientesService');
const { invalidateClientesCache } = require('../middlewares/cache');

exports.getAll = async (req, res) => {
  const clientes = await clientesService.getAllClientes();
  res.json(clientes);
};

exports.getById = async (req, res) => {
  const cliente = await clientesService.getClienteById(req.params.id);
  if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });
  res.json(cliente);
};

exports.create = async (req, res) => {
  const novo = await clientesService.createCliente(req.body);
  invalidateClientesCache();
  res.status(201).json(novo);
};

exports.update = async (req, res) => {
  const atualizado = await clientesService.updateCliente(req.params.id, req.body);
  if (!atualizado) return res.status(404).json({ message: 'Cliente não encontrado' });
  invalidateClientesCache();
  res.json(atualizado);
};

exports.delete = async (req, res) => {
  const deletado = await clientesService.deleteCliente(req.params.id);
  if (!deletado) return res.status(404).json({ message: 'Cliente não encontrado' });
  invalidateClientesCache();
  res.json({ message: 'Cliente deletado' });
};