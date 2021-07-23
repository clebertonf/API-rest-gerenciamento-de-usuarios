const connection = require('./connection');

const createUserBank = async (name, email, password) => {
  try {
    const userCreate = await connection().then((db) => db.collection('users').insertOne({ name, email, password }));
    console.log(userCreate);
    return userCreate.acknowledged;
  } catch (err) {
    console.log(err);
  }
};

const checkUserBankWithEmail = async (email) => {
  try {
    return await connection().then((db) => db.collection('users').findOne({ email }));
  } catch (err) {
    console.log(err);
  }
};

const searchAllUsersBank = async () => {
  try {
    return await connection().then((db) => db.collection('users').find().toArray());
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUserBank,
  checkUserBankWithEmail,
  searchAllUsersBank,
};
