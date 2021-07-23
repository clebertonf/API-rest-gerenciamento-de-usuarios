const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const { emailExists, erroDataBank, noUsersFound } = require('../schemas/messagesErro');

const createUser = async (name, email, password) => {
  const saltRounds = 10;

  const hash = await bcrypt.hash(password, saltRounds);

  const userCreate = await UserModel.createUserBank(name, email, hash);

  if (userCreate) return { code: 200, message: 'Usuario Criado com Sucesso!' };
  return erroDataBank;
};

const searchAllUsers = async () => {
  const users = await UserModel.searchAllUsersBank();
  if (!users) return erroDataBank;
  if (users.length >= 1) {
    users.map((user) => delete user.password);
    return users;
  }
  return noUsersFound;
};

const existingEmailValidation = async (email) => {
  const userExists = await UserModel.checkUserBankWithEmail(email);
  if (userExists) return emailExists;
};

const searchUserById = async (id) => {
  const user = await UserModel.searchUserByIdBank(id);
  if (!user) return erroDataBank;

  delete user.password;
  return user;
};

const editUser = async (id, name, email) => {
  const userEdit = await UserModel.editUserBank(id, name, email);
  if (!userEdit) return erroDataBank;

  delete userEdit.password;
  return userEdit;
};

module.exports = {
  existingEmailValidation,
  searchAllUsers,
  createUser,
  searchUserById,
  editUser,
};
