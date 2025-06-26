const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { validateUsuario } = require('../middlewares/validate');
const auth = require('../middlewares/auth');

router.post('/', validateUsuario, usuariosController.create);
router.get('/', auth, usuariosController.getAll);

module.exports = router;