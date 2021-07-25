const emptyFields = {
  code: 205,
  message: 'Todos campos São Obrigatorios!',
};

const passwordLength = {
  code: 205,
  message: 'Senha deve ter no minimo 6 caracteres!',
};

const emailExists = {
  code: 409,
  message: 'Usuario ja cadastrado na base de dados!',
};

const erroDataBank = {
  code: 500,
  message: 'Aconteceu algo inesperado!',
};

const noUsersFound = {
  code: 404,
  message: 'Nenhum usuario encontrado!',
};

const emailRegex = {
  code: 205,
  message: 'Email formato invalido!',
};

const UserNotExists = {
  code: 205,
  message: 'Usuario não existe!',
};

const InvalidPassword = {
  code: 205,
  message: 'Senha invalida!',
};

const InvalidToken = {
  code: 205,
  message: 'Token invalido!',
};

const ExpiresToken = {
  code: 205,
  message: 'Token expirado!',
};

module.exports = {
  emptyFields,
  passwordLength,
  emailExists,
  erroDataBank,
  noUsersFound,
  emailRegex,
  UserNotExists,
  InvalidPassword,
  InvalidToken,
  ExpiresToken,
};
