const userIndex = (_req, resp) => {
  resp.status(200).json({ message: 'Rota /' });
};

module.exports = {
  userIndex,
};
