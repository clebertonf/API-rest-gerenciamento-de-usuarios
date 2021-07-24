const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
require('dotenv/config');

const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

module.exports = async (req, resp, next) => {
  const token = req.headers.authorization;

  if (!token) return resp.status(UNAUTHORIZED).json({ message: 'Token not found' });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decode.data;

    const user = await UserModel.searchUserByIdBank(id);

    if (!user) {
      return resp.status(NOT_FOUND)
        .json({ message: 'Usuario não existe' });
    }

    const userToken = {
      id,
      name: user.name,
      email: user.email,
    };
    req.user = userToken;
  } catch (err) {
    return resp.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
  next();
};
