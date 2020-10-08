const User = require('./user.model');
const taskService = require('../tasks/tasks.service');

const users = [];
const getAll = async () => {
  return users;
};

const getUserById = async id => {
  return users.find(user => user.id === id);
};

const createUser = async user => {
  const newUser = new User({
    id: null,
    name: user.name,
    login: user.login,
    password: user.password
  });
  users.push(newUser);
  return newUser;
};

const updateUser = async (id, data) => {
  const userId = users.findIndex(user => user.id === id);
  if (userId < 0) {
    return null;
  }
  users[userId].name = data.name ? data.name : users[userId].name;
  users[userId].login = data.login ? data.login : users[userId].login;
  users[userId].password = data.password
    ? data.password
    : users[userId].password;
  return users[userId];
};

const deleteUser = async id => {
  const index = users.findIndex(user => user.id === id);
  if (index < 0) {
    return false;
  }
  users.splice(index, 1);
  await taskService.deleteUserFromTasks(id);
  return true;
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
