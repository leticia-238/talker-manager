class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const emptyEmail = 'O campo "email" é obrigatório';
const invalidEmail = 'O "email" deve ter o formato "email@email.com"';
const emptyPassword = 'O campo "password" é obrigatório';
const invalidPassword = 'O "password" deve ter pelo menos 6 caracteres';

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  
  if (!email) throw new ValidationError(emptyEmail);
  if (!/\S+@\S+\.com/.test(email)) throw new ValidationError(invalidEmail);
  if (!password) throw new ValidationError(emptyPassword);
  if (!/\S{6,}/.test(password)) throw new ValidationError(invalidPassword);
  
  next(); 
};

module.exports = validateLogin;