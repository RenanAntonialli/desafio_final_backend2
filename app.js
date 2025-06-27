require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Serviços
const produtosService = require('./services/produtosService');
const clientesService = require('./services/clientesService');
const usuariosService = require('./services/usuariosService');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configuração do Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// --- Middleware para checar autenticação na web ---
function webAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.clearCookie('token');
    return res.redirect('/login');
  }
}

// Página inicial
app.get('/', (req, res) => {
  const user = req.cookies.token ? true : false;
  res.render('index', { user });
});

// Login (GET e POST) - WEB
app.get('/login', (req, res) => res.render('login', { error: null }));

app.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;
  const user = await usuariosService.getUsuarioByUsername(usuario);
  const bcrypt = require('bcrypt');
  if (!user || !(await bcrypt.compare(senha, user.senha))) {
    return res.render('login', { error: 'Usuário ou senha inválidos' });
  }
  const token = jwt.sign({ id: user.id, usuario: user.usuario }, process.env.JWT_SECRET, { expiresIn: '2h' });
  await usuariosService.setUserToken(user.id, token);
  res.cookie('token', token, { httpOnly: true });
  res.redirect('/');
});

// Logout (GET) - WEB
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.render('logout');
});

// --- ROTAS WEB PROTEGIDAS (Páginas) ---
// Produtos (público)
app.get('/produtos', async (req, res) => {
  const produtos = await produtosService.getAllProdutos();
  const user = req.cookies.token ? true : false;
  res.render('produtos', { produtos, user });
});

// Clientes (protegido)
app.get('/clientes', webAuth, async (req, res) => {
  const clientes = await clientesService.getAllClientes();
  const user = true;
  res.render('clientes', { clientes, user });
});

// Usuários (protegido)
app.get('/usuarios', webAuth, async (req, res) => {
  const usuarios = await usuariosService.getAllUsuarios();
  const user = true;
  res.render('usuarios', { usuarios, user });
});

// --- ROTAS REST/API ---
// (Devem vir depois das rotas web!)
app.use('/clientes', require('./routes/clientes'));
app.use('/produtos', require('./routes/produtos'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/', require('./routes/auth')); // login/logout (API REST)

// Logout (POST) - API REST
app.post('/logout', async (req, res) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  if (token) {
    const pool = require('./configs/db');
    await pool.query('UPDATE usuarios SET token = NULL WHERE token = ?', [token]);
  }
  res.clearCookie('token');
  res.json({ message: 'Logout efetuado com sucesso' });
});

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = app;