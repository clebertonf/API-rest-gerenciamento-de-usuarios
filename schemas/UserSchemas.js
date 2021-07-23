// Referência regex: https://regexr.com/3e48o
const { emptyFields, passwordLength, emailRegex } = require('./messagesErro');

const validationEmptyFields = (name, email, password) => {
  if (!name || !email || !password) return emptyFields;
};

const validatePasswordLength = (password) => {
  if (password.length < 6) return passwordLength;
};

const validateRegexEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regex.test(email)) return emailRegex;
};

module.exports = {
  validationEmptyFields,
  validatePasswordLength,
  validateRegexEmail,
};
