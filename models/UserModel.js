const { ObjectId } = require('mongodb');
const connection = require('./connection');

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

const deleteUserBank = async (id) => {
  try {
    const userDelete = await connection().then((db) => db.collection('users').deleteOne({ _id: ObjectId(id) }));
    return userDelete.deletedCount;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  searchAllUsersBank,
  searchUserByIdBank,
  editUserBank,
  deleteUserBank,
};
