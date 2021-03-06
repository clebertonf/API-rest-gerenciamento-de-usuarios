const jwt = require('jsonwebtoken');
require('dotenv/config');

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createJWT = (id, name, email) => {
  try {
    const token = jwt.sign({ data: { id, name, email } }, process.env.JWT_SECRET, jwtConfig);
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createJWT,
};
