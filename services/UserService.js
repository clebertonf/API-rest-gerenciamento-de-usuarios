const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const { emailExists } = require('../schemas/messagesErro');

const createUser = async (name, email, password) => {
  const saltRounds = 10;

  const hash = await bcrypt.hash(password, saltRounds);

  const userCreate = await UserModel.createUserBank(name, email, hash);

  if (userCreate) return { code: 200, message: 'Usuario Criado com Sucesso!' };
  return false;
};

const searchAllUsers = async () => {
  const users = await UserModel.searchAllUsersBank();
  if (users.length >= 1) {
    users.map((user) => delete user.password);
    return users;
  }
  if (!users) return { code: 404, message: 'Nehum usuario encontrado!' };
};

const existingEmailValidation = async (email) => {
  const userExists = await UserModel.checkUserBankWithEmail(email);
  if (userExists) return emailExists;
};

module.exports = {
  existingEmailValidation,
  searchAllUsers,
  createUser,
};
