const UserSchemas = require('../schemas/UserSchemas');
const UserServices = require('../services/UserService');

const createUser = async (req, resp) => {
  const { name, email, password } = req.body;

  const dataValidation = UserSchemas.validationEmptyFields(name, email, password)
     || UserSchemas.validatePasswordLength(password) || UserSchemas.validateRegexEmail(email)
     || await UserServices.existingEmailValidation(email);

  if (!dataValidation) {
    const response = await UserServices.createUser(name, email, password);

    if (response.code) return resp.status(response.code).json({ message: response.message });
  }

  return resp.status(dataValidation.code)
    .json({ message: dataValidation.message });
};

const searchAllUsers = async (_req, resp) => {
  const response = await UserServices.searchAllUsers();

  if (response.code) return resp.status(response.code).json({ message: response.message });

  return resp.status(200).json(response);
};

module.exports = {
  createUser,
  searchAllUsers,
};
