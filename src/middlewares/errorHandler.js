const {
  STATUS_BAD_REQUEST,
  STATUS_UNAUTHORIZED,
  STATUS_INTERNAL_SERVER_ERROR,
} = require('../helpers/constants');

const errorHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'ValidationError':
      res.status(STATUS_BAD_REQUEST).json({ message });
      break;
    case 'AuthorizationError':
      res.status(STATUS_UNAUTHORIZED).json({ message });
      break;
    default: res.status(STATUS_INTERNAL_SERVER_ERROR).send();
      break;
  }
};

module.exports = errorHandler;