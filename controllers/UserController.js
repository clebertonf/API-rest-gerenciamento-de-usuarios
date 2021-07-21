const createUser = (req, resp) => {
  const { name, email, password } = req.body;

  resp.status(200).json({ message: 'Rota para criar user' });
};

module.exports = {
  createUser,
};
