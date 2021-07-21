const { emptyFields } = require('./messagesErro');

const validationEmptyFields = (name, email, password) => {
  if (!name || !email || !password) return emptyFields;
  return true;
};

module.exports = {
  validationEmptyFields,
};
