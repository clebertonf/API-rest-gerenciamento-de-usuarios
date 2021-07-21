const UserServices = require('../services/UserService');

const createUser = (req, resp) => {
  const { name, email, password } = req.body;

  const dataValidation = UserServices.dataValidation(name, email, password);

  resp.status(200).json({ message: 'Rota para criar user' });
};

module.exports = {
  createUser,
};
