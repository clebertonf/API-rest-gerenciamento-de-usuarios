const connection = require('./connection');

const createUserBank = async (name, email, password) => {
  try {
    const userCreate = await connection().then((db) => db.collection('users').insertOne({ name, email, password }));
    return userCreate.acknowledged;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUserBank,
};
