const { emputValues } = require('./messagesErro');

const dataValidation = (name, email, password) => {
  if (!name || !email || !password) return emputValues;
  return true;
};

module.exports = { dataValidation };
