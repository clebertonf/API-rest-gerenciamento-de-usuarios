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

const searchAllUsers = async () => {
  const users = await UserModel.searchAllUsersBank();
  if (users.length >= 1) {
    users.map((user) => delete user.password);
    return users;
  }
  return false;
};

module.exports = {
  validationEmptyFields,
  validatePasswordLength,
  existingEmailValidation,
  searchAllUsers,
};
