const { emptyFields, passwordLength, emailExists } = require('./messagesErro');

const validationEmptyFields = (name, email, password) => {
  if (!name || !email || !password) return emptyFields;
};

// const existingEmailValidation = (email) => {
//     return
// };

const validatePasswordLength = (password) => {
  if (password.length < 6) return passwordLength;
};

module.exports = {
  validationEmptyFields,
  validatePasswordLength,
};
