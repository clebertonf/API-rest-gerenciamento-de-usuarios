const bcrypt = require('bcrypt');
const crypto = require('crypto');
const UserModel = require('../models/UserModel');
const {
  emailExists, erroDataBank, noUsersFound, UserNotExists, InvalidPassword,
} = require('../schemas/messagesErro');
const token = require('../auth/createJWT');

const searchUserByEmail = async (email) => {
  const user = await UserModel.searchUserByEmailBank(email);
  if (!user) return UserNotExists;

  return user;
};

const createUser = async (name, email, password) => {
  const saltRounds = 10;

  const hash = await bcrypt.hash(password, saltRounds);

  const userCreate = await UserModel.createUserBank(name, email, hash);
  const user = await searchUserByEmail(email);
  delete user.password;
  const { _id } = user;

  if (userCreate) return { code: 200, message: 'Usuario Criado com Sucesso!', token: token.createJWT(_id, name, email) };
  return erroDataBank;
};

const authenticateUser = async (email, password) => {
  const user = await searchUserByEmail(email);

  if (user.code) return user;

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) return InvalidPassword;

  delete user.password;
  const { _id, name } = user;

  return {
    user,
    token: token.createJWT(_id, name, email),
  };
};

const forgotPassword = async (id) => {
  const randonToken = crypto.randomBytes(20).toString('hex');
  const now = new Date();

  const expirationOneHour = now.setHours(now.getHours() + 1);

  await UserModel.editResetToken(id, randonToken, expirationOneHour);
  return true;
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
  if (!user) return UserNotExists;

  delete user.password;
  return user;
};

const editUser = async (id, name, email) => {
  const userEdit = await UserModel.editUserBank(id, name, email);
  if (!userEdit) return UserNotExists;

  delete userEdit.password;
  return userEdit;
};

const deleteUser = async (id) => {
  const userDelete = await UserModel.deleteUserBank(id);
  if (userDelete === 0 || !userDelete) return UserNotExists;
  return { code: 200, message: 'Usuario excluido com sucesso!' };
};

module.exports = {
  existingEmailValidation,
  searchAllUsers,
  createUser,
  searchUserById,
  editUser,
  deleteUser,
  searchUserByEmail,
  authenticateUser,
  forgotPassword,
};
