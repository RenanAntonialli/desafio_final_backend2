const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const { validateProduto } = require('../middlewares/validate');

router.get('/', produtosController.getAll);
router.get('/:id', produtosController.getById);
router.post('/', validateProduto, produtosController.create);
router.put('/:id', validateProduto, produtosController.update);
router.delete('/:id', produtosController.delete);

module.exports = router;