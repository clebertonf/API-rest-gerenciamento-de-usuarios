const UserServices = require('../services/UserService');

const createUser = (req, resp) => {
  const { name, email, password } = req.body;

  const dataValidation = UserServices.dataValidation(name, email, password);

  if (dataValidation.code) {
    return resp.status(dataValidation.code)
      .json({ message: dataValidation.message });
  }

  return resp.status(200).json({ message: 'Criado com sucesso' });
};

module.exports = {
  createUser,
};
