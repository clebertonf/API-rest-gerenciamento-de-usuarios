const { emptyFields, passwordLength, emailExists } = require('./messagesErro');
const UserModel = require('../models/UserModel');

const validationEmptyFields = (name, email, password) => {
  if (!name || !email || !password) return emptyFields;
};

const existingEmailValidation = async (email) => {
  const userExists = await UserModel.checkUserBankWithEmail(email);
  if (userExists) return emailExists;
};

const validatePasswordLength = (password) => {
  if (password.length < 6) return passwordLength;
};

module.exports = {
  validationEmptyFields,
  validatePasswordLength,
  existingEmailValidation,
};
