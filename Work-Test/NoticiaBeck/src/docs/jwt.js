require('dotenv').config();

module.exports = {
  segredo: process.env.JWT_SECRET,
  expiracao: process.env.JWT_EXPIRES_IN || '1h'
};