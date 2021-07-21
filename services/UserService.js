const { emptyFields } = require('./messagesErro');

const dataValidation = (name, email, password) => {
  if (!name || !email || !password) return emptyFields;
  return true;
};

module.exports = { dataValidation };
