const LoginSchemas = require('../schemas/LoginSchemas');
const LoginServices = require('../services/LoginServices');

const createUser = async (req, resp) => {
  const { name, email, password } = req.body;

  const response = await LoginServices.createUser(name, email, password);
  if (response.code) {
    return resp.status(response.code)
      .json({ message: response.message });
  }
};

const authenticateUser = async (req, resp) => {
  const { email, password } = req.body;

  const dataValidation = await LoginServices.authenticateUser(email, password);

  if (dataValidation.code) {
    return resp.status(dataValidation.code)
      .json({ message: dataValidation.message });
  }

  return resp.status(200)
    .json(dataValidation);
};

const forgotPassword = async (req, resp) => {
  const { email } = req.body;

  const response = await LoginServices.searchUserByEmail(email);

  if (response.code) {
    return resp.status(response.code)
      .json({ message: response.message });
  }

  const forgotResponse = await LoginServices.forgotPassword(response._id, email);
  return resp.status(forgotResponse.code)
    .json({ message: forgotResponse.message });
};

const resetPassword = async (req, resp) => {
  const {
    email, password, token,
  } = req.body;

  const response = await LoginServices.searchUserByEmail(email);

  if (response.code) {
    return resp.status(response.code)
      .json({ message: response.message });
  }

  const { passwordResetToken, passwordResetExpires } = response;

  const validToken = LoginSchemas.validToken(token, passwordResetToken)
     || LoginSchemas.validExpiresToken(passwordResetExpires);

  if (!validToken) {
    const editPessword = await LoginServices.editPassword(email, password);
    return resp.status(200)
      .json(editPessword);
  }
  if (validToken.code) {
    return resp.status(validToken.code)
      .json({ message: validToken.message });
  }
};

module.exports = {
  createUser,
  authenticateUser,
  forgotPassword,
  resetPassword,
};
