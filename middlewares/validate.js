const { body, validationResult } = require('express-validator');

exports.validateCliente = [
  body('nome').isLength({ min: 3, max: 255 }),
  body('sobrenome').isLength({ min: 3, max: 255 }),
  body('email').isEmail(),
  body('idade').isInt({ min: 1, max: 119 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateProduto = [
  body('nome').isLength({ min: 3, max: 255 }),
  body('descricao').isLength({ min: 3, max: 255 }),
  body('preco').isFloat({ gt: 0 }),
  body('data_atualizado').custom((value) => {
    const d = new Date(value);
    if (d < new Date('2000-01-01') || d > new Date('2025-06-20')) throw new Error('data_atualizado inválida');
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateUsuario = [
  body('usuario').isLength({ min: 3, max: 255 }),
  body('senha').isLength({ min: 3, max: 255 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];