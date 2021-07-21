const UserServices = require('../services/UserService');

const createUser = (req, resp) => {
  const { name, email, password } = req.body;

  const dataValidation = UserServices.validationEmptyFields(name, email, password)
     || UserServices.validatePasswordLength(password);

  if (!dataValidation) return resp.status(200).json({ message: 'Criado com sucesso' });

  if (dataValidation.code) {
    return resp.status(dataValidation.code)
      .json({ message: dataValidation.message });
  }
};

module.exports = {
  createUser,
};
