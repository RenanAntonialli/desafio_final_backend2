const produtosService = require('../services/produtosService');

exports.getAll = async (req, res) => {
  const produtos = await produtosService.getAllProdutos();
  res.json(produtos);
};

exports.getById = async (req, res) => {
  const produto = await produtosService.getProdutoById(req.params.id);
  if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json(produto);
};

exports.create = async (req, res) => {
  const novo = await produtosService.createProduto(req.body);
  res.status(201).json(novo);
};

exports.update = async (req, res) => {
  const atualizado = await produtosService.updateProduto(req.params.id, req.body);
  if (!atualizado) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json(atualizado);
};

exports.delete = async (req, res) => {
  const deletado = await produtosService.deleteProduto(req.params.id);
  if (!deletado) return res.status(404).json({ message: 'Produto não encontrado' });
  res.json({ message: 'Produto deletado' });
};