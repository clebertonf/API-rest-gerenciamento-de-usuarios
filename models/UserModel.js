const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUserBank = async (name, email, password) => {
  const passwordResetToken = '';
  const passwordResetExpires = new Date('');
  const role = 'user';
  try {
    const userCreate = await connection().then((db) => db.collection('users').insertOne({
      name,
      email,
      password,
      passwordResetToken,
      passwordResetExpires,
      role,
      createdAt: new Date(),
    }));
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

const searchUserByIdBank = async (id) => {
  try {
    const user = await connection().then((db) => (ObjectId(id) ? db.collection('users').find({ _id: ObjectId(id) }).toArray() : false));
    return user[0];
  } catch (err) {
    console.log(err);
  }
};

const searchUserByEmailBank = async (email) => {
  try {
    const user = await connection().then((db) => db.collection('users').find({ email }).toArray());
    return user[0];
  } catch (err) {
    console.log(err);
  }
};

const editUserBank = async (id, name, email) => {
  try {
    await connection().then((db) => (ObjectId(id) ? db.collection('users')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, email } }) : false));

    const user = await searchUserByIdBank(id);
    return user;
  } catch (err) {
    console.log(err);
  }
};

const editResetToken = async (id, passwordResetToken, passwordResetExpires) => {
  try {
    await connection().then((db) => (ObjectId(id) ? db.collection('users')
      .updateOne({ _id: ObjectId(id) },
        { $set: { passwordResetToken, passwordResetExpires } }) : false));

    const user = await searchUserByIdBank(id);
    return user;
  } catch (err) {
    console.log(err);
  }
};

const deleteUserBank = async (id) => {
  try {
    const userDelete = await connection().then((db) => db.collection('users').deleteOne({ _id: ObjectId(id) }));
    return userDelete.deletedCount;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUserBank,
  checkUserBankWithEmail,
  searchAllUsersBank,
  searchUserByIdBank,
  editUserBank,
  deleteUserBank,
  searchUserByEmailBank,
  editResetToken,
};
