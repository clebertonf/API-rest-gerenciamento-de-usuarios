const { emptyFields, passwordLength } = require('./messagesErro');

const validationEmptyFields = (name, email, password) => {
  if (!name || !email || !password) return emptyFields;
};

const validatePasswordLength = (password) => {
  if (password.length < 6) return passwordLength;
};

module.exports = {
  validationEmptyFields,
  validatePasswordLength,
};
