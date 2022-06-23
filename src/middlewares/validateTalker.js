const ValidationError = require('../helpers/ValidationError');

const INVALID_NAME = 'O "name" deve ter pelo menos 3 caracteres';
const INVALID_AGE = 'A pessoa palestrante deve ser maior de idade';
const INVALID_WATCHED_AT = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const INVALID_RATE = 'O campo "rate" deve ser um inteiro de 1 à 5';

const checkEmptyField = (fieldValue, fieldName) => {
  if (!fieldValue) throw new ValidationError(`O campo "${fieldName}" é obrigatório`);
};

const validateName = (name) => {
  if (name.trim().length < 3) throw new ValidationError(INVALID_NAME);
};

const validateAge = (age) => {
  if (age < 18) throw new ValidationError(INVALID_AGE);
};

const validateWatchedAt = (watchedAt) => {
  const dateRegex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
  if (!dateRegex.test(watchedAt)) {
    throw new ValidationError(INVALID_WATCHED_AT);
  }
};

const validateRate = (rate) => {
  const rateRange = rate >= 1 && rate <= 5;
  if (!Number.isInteger(rate) || !rateRange) {
    throw new ValidationError(INVALID_RATE);
  }
};

const validateTalker = (req, _res, next) => {
  const { name, age, talk } = req.body;

  checkEmptyField(name, 'name');
  checkEmptyField(age, 'age');
  checkEmptyField(talk, 'talk');
  
  const { watchedAt, rate = '' } = talk;
  
  checkEmptyField(watchedAt, 'watchedAt');
  checkEmptyField(rate.toString(), 'rate');

  validateName(name);
  validateAge(age);
  validateWatchedAt(watchedAt);
  validateRate(rate);

  next();
};

module.exports = validateTalker;