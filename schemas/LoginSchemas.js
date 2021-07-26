// Referência regex: https://regexr.com/3e48o
const {
  emptyFields, passwordLength, emailRegex, InvalidToken, ExpiresToken,
} = require('./messagesErro');

const validationEmptyFields = (name, email, password) => {
  if (!name || !email || !password) return emptyFields;
};

const validatePasswordLength = (password) => {
  if (password.length < 6) return passwordLength;
};

const validateRegexEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!regex.test(email)) return emailRegex;
};

const validToken = (tokenUser, token) => {
  if (token !== tokenUser) return InvalidToken;
};

const validExpiresToken = (passwordResetExpires) => {
  if (new Date() > passwordResetExpires) return ExpiresToken;
};
module.exports = {
  validationEmptyFields,
  validatePasswordLength,
  validateRegexEmail,
  validToken,
  validExpiresToken,
};
