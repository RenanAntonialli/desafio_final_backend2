const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const auth = require('../middlewares/auth');
const cache = require('../middlewares/cache');
const { validateCliente } = require('../middlewares/validate');

router.get('/', auth, cache, clientesController.getAll);
router.get('/:id', auth, clientesController.getById);
router.post('/', auth, validateCliente, clientesController.create);
router.put('/:id', auth, validateCliente, clientesController.update);
router.delete('/:id', auth, clientesController.delete);

module.exports = router;