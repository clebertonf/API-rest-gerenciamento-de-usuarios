const createUser = (_req, resp) => {
  resp.status(200).json({ message: 'Rota para criar user' });
};

module.exports = {
  userIndex,
  createUser,
};
