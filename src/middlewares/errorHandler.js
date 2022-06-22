const errorHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
      case 'ValidationError': 
        res.status(400).json({ message });
        break;
      default: res.status(500);
        break;
  }
};

module.exports = errorHandler;