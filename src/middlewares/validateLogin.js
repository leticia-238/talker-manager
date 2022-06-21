const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  
  if (!email && !password) throw new Error('invalid data');
  next(); 
};

module.exports = validateLogin;