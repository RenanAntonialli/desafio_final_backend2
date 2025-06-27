const cache = require('../configs/cache');

module.exports = function (req, res, next) {
  const key = req.originalUrl;
  const cachedData = cache.get(key);

  if (cachedData) {
    console.log('Cache hit: retornando clientes do cache...');
    return res.json(cachedData);
  }

  // Intercepta o método res.json para armazenar no cache
  res.sendJson = res.json;
  res.json = (body) => {
    cache.set(key, body);
    console.log('Cache miss: buscando clientes no banco de dados...');
    res.sendJson(body);
  };

  next();
};

// Funções para invalidar cache em operações de escrita:
module.exports.invalidateClientesCache = () => {
  cache.keys().forEach((key) => {
    if (key.startsWith('/clientes')) cache.del(key);
  });
  console.log('Cache de clientes invalidado');
};