const UserModel = require('../models/UserModel');
const { erroDataBank, noUsersFound, UserNotExists } = require('../schemas/messagesErro');

const searchAllUsers = async () => {
  const users = await UserModel.searchAllUsersBank();
  if (!users) return erroDataBank;
  if (users.length >= 1) {
    users.map((user) => delete user.password);
    return users;
  }
  return noUsersFound;
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
  searchAllUsers,
  searchUserById,
  editUser,
  deleteUser,
};
