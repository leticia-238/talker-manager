class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const TOKEN_NOT_FOUND = 'Token não encontrado';
const INVALID_TOKEN = 'Token inválido';

const validateAuth = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw new AuthorizationError(TOKEN_NOT_FOUND);
  else if (!/\S{16}/.test(authorization)) throw new AuthorizationError(INVALID_TOKEN);

  next();
};

module.exports = validateAuth;
