const UserSchemas = require('../schemas/UserSchemas');
const UserServices = require('../services/UserService');

const createUser = async (req, resp) => {
  const { name, email, password } = req.body;

  const dataValidation = UserSchemas.validationEmptyFields(name, email, password)
     || UserSchemas.validatePasswordLength(password) || UserSchemas.validateRegexEmail(email)
     || await UserServices.existingEmailValidation(email);

  if (!dataValidation) {
    const response = await UserServices.createUser(name, email, password);

    if (response.code) {
      return resp.status(response.code)
        .json({ message: response.message, token: response.token });
    }
  }

  return resp.status(dataValidation.code)
    .json({ message: dataValidation.message });
};

const authenticateUser = async (req, resp) => {
  const { email, password } = req.body;

  const dataValidation = await UserServices.authenticateUser(email, password);

  if (dataValidation.code) {
    return resp.status(dataValidation.code)
      .json({ message: dataValidation.message });
  }

  return resp.status(200)
    .json(dataValidation);
};

const forgotPassword = async (req, resp) => {
  const { email } = req.body;

  const response = await UserServices.searchUserByEmail(email);

  if (response.code) {
    return resp.status(response.code)
      .json({ message: response.message });
  }

  const forgotResponse = await UserServices.forgotPassword(response._id, email);
  return resp.status(forgotResponse.code)
    .json({ message: forgotResponse.message });
};

const resetPassword = async (req, resp) => {
  const {
    email, password, token,
  } = req.body;

  const response = await UserServices.searchUserByEmail(email);

  if (response.code) {
    return resp.status(response.code)
      .json({ message: response.message });
  }

  const { passwordResetToken, passwordResetExpires } = response;

  const validToken = UserSchemas.validToken(token, passwordResetToken)
   || UserSchemas.validExpiresToken(passwordResetExpires);

  if (!validToken) {
    const editPessword = await UserServices.editPassword(email, password);
    return resp.status(200)
      .json(editPessword);
  }
  if (validToken.code) {
    return resp.status(validToken.code)
      .json({ message: validToken.message });
  }
};

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
  createUser,
  searchAllUsers,
  searchUserById,
  editUser,
  deleteUser,
  authenticateUser,
  forgotPassword,
  resetPassword,
};
