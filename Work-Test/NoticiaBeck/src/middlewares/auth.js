const jwt = require('jsonwebtoken');
const { segredo } = require('../docs/jwt');

function autenticarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ erro: 'Token ausente' });

  jwt.verify(token, segredo, (err, usuario) => {
    if (err) return res.status(403).json({ erro: 'Token inválido' });

    req.usuario = usuario;
    next();
  });
}

module.exports = autenticarToken;
