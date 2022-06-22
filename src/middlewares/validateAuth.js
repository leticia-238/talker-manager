class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const tokenNotFound = 'Token não encontrado';
const invalidToken = 'Token inválido';

const validateAuth = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw new AuthorizationError(tokenNotFound);
  else if (!/\S{16}/.test(authorization)) throw new AuthorizationError(invalidToken);

  next();
};

module.exports = validateAuth;
