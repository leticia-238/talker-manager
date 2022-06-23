const ValidationError = require('../helpers/ValidationError');

const EMPTY_EMAIL = 'O campo "email" é obrigatório';
const INVALID_EMAIL = 'O "email" deve ter o formato "email@email.com"';
const EMPTY_PASSWORD = 'O campo "password" é obrigatório';
const INVALID_PASSWORD = 'O "password" deve ter pelo menos 6 caracteres';

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  
  if (!email) throw new ValidationError(EMPTY_EMAIL);
  else if (!/\S+@\S+\.com/.test(email)) throw new ValidationError(INVALID_EMAIL);
  else if (!password) throw new ValidationError(EMPTY_PASSWORD);
  else if (!/\S{6,}/.test(password)) throw new ValidationError(INVALID_PASSWORD);
  
  next(); 
};

module.exports = validateLogin;