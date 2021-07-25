const UserSchemas = require('../schemas/UserSchemas');
const UserServices = require('../services/UserService');

const searchAllUsers = async (req, resp) => {
  const response = await UserServices.searchAllUsers();

  if (response.code) return resp.status(response.code).json({ message: response.message });

  return resp.status(200).json(response);
};

const searchUserById = async (req, resp) => {
  const { id } = req.params;

  const response = await UserServices.searchUserById(id);
  if (response.code) return resp.status(response.code).json({ message: response.message });

  return resp.status(200).json(response);
};

const editUser = async (req, resp) => {
  const { name, email } = req.body;
  const { id } = req.params;

  const response = await UserServices.editUser(id, name, email);

  if (response.code) return resp.status(response.code).json({ message: response.message });

  return resp.status(201)
    .json(response);
};

const deleteUser = async (req, resp) => {
  const { id } = req.params;
  const response = await UserServices.deleteUser(id);

  if (response.code) return resp.status(response.code).json({ message: response.message });

  return resp.status(200)
    .json(response);
};

module.exports = {
  searchAllUsers,
  searchUserById,
  editUser,
  deleteUser,
};
