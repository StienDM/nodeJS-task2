const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/tasks.service');

const getAll = () => usersRepo.getAll();

const createUser = user => {
  return usersRepo.createUser(user);
};

const getUserById = id => usersRepo.getUserById(id);

const updateUser = (id, data) => {
  return usersRepo.updateUser(id, data);
};

const deleteUser = async id => {
  await taskService.deleteUserFromTasks(id);
  return usersRepo.deleteUser(id);
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
