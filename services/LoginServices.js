const bcrypt = require('bcrypt');
const crypto = require('crypto');
const LoginModel = require('../models/LoginModel');
const mailer = require('../modules/mailer');
const {
  emailExists, erroDataBank, UserNotExists, InvalidPassword,
} = require('../schemas/messagesErro');
const token = require('../auth/createJWT');

const searchUserByEmail = async (email) => {
  const user = await LoginModel.searchUserByEmailBank(email);
  if (!user) return UserNotExists;

  return user;
};

const createUser = async (name, email, password) => {
  const saltRounds = 10;

  const hash = await bcrypt.hash(password, saltRounds);

  const userCreate = await LoginModel.createUserBank(name, email, hash);
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

const forgotPassword = async (id, email) => {
  try {
    const randonToken = crypto.randomBytes(20).toString('hex');
    const now = new Date();

    now.setHours(now.getHours() + 1);

    await LoginModel.editResetToken(id, randonToken, now);

    mailer.sendMail({
      to: email,
      from: 'clebertonfgc@gmail.com',
      subject: 'Redefinição de Senha',
      html: `<h3>Seu token para redefinir a senha esta aqui esta aqui <h3/> ${randonToken}`,

    }, (err) => {
      if (err) return { code: 400, message: `Erro ao enviar o email, tente novamente!${err}` };
    });

    return { code: 200, message: 'Email redefinição de senha enviado com sucesso!' };
  } catch (err) {
    console.log(err);
  }
};

const editPassword = async (email, password) => {
  const saltRounds = 10;

  const hash = await bcrypt.hash(password, saltRounds);
  const editUser = await LoginModel.editPassword(email, hash);

  return editUser;
};

const existingEmailValidation = async (email) => {
  const userExists = await LoginModel.checkUserBankWithEmail(email);
  if (userExists) return emailExists;
};

module.exports = {
  existingEmailValidation,
  createUser,
  searchUserByEmail,
  authenticateUser,
  forgotPassword,
  editPassword,
};
