const User = require('./user.model');

const getAll = () => {
  return User.find({});
};

const getUserById = async id => {
  return User.findOne({ _id: id });
};

const createUser = async user => {
  return User.create(user);
};

const updateUser = async (id, data) => {
  return User.updateOne({ _id: id }, data);
};

const deleteUser = async id => {
  return (await User.deleteOne({ _id: id })).deletedCount;
};

const getPasswordByUser = async (login, password) =>
  User.findOne({ login, password });

module.exports = {
  getAll,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getPasswordByUser
};
