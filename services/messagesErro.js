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
  message: 'Senha deve ter no minimo 6 caracteres!',
};

module.exports = {
  emptyFields,
  passwordLength,
  emailExists,
};
