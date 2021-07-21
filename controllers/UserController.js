const bcrypt = require('bcrypt');
const UserServices = require('../services/UserService');
const UserModel = require('../models/UserModel');

const createUser = async (req, resp) => {
  const { name, email, password } = req.body;

  const dataValidation = UserServices.validationEmptyFields(name, email, password)
     || UserServices.validatePasswordLength(password)
     || await UserServices.existingEmailValidation(email);

  if (!dataValidation) {
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    const userCreate = await UserModel.createUserBank(name, email, hash);

    if (userCreate) return resp.status(200).json({ message: 'Usuario Criado Com Sucesso!' });
  }

  return resp.status(dataValidation.code)
    .json({ message: dataValidation.message });
};

module.exports = {
  createUser,
};
