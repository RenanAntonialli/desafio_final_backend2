require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

// Middlewares globais
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View engine Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Rotas
app.get('/', (req, res) => res.render('index'));
app.use('/clientes', require('./routes/clientes'));
app.use('/produtos', require('./routes/produtos'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/', require('./routes/auth'));

// Rotas das views (web minimalista)
app.get('/login', (req, res) => res.render('login'));
app.get('/logout', (req, res) => res.render('logout'));

// Para listar produtos e clientes em interface web (simples)
const produtosService = require('./services/produtosService');
const clientesService = require('./services/clientesService');

app.get('/produtos', async (req, res) => {
  const produtos = await produtosService.getAllProdutos();
  res.render('produtos', { produtos });
});
app.get('/clientes', async (req, res) => {
  // Só renderiza se for autenticado (token via query para demo)
  const token = req.query.token;
  if (!token) return res.status(401).send('Token necessário');
  const jwt = require('jsonwebtoken');
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const clientes = await clientesService.getAllClientes();
    res.render('clientes', { clientes });
  } catch {
    res.status(401).send('Token inválido');
  }
});

// 404
app.use((req, res) => res.status(404).json({ message: 'Not found' }));

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

module.exports = app;