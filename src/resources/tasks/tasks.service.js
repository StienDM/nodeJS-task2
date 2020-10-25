const taskRepo = require('./tasks.db.repository');

const getTasksByBoardId = boardId => taskRepo.getTasksByBoardId(boardId);

const getAll = () => taskRepo.getAll();

const getTasksByBoardTaskIds = (boardId, taskId) => {
  return taskRepo.getTasksByBoardTaskIds(boardId, taskId);
};

const createTask = (boardId, task) => taskRepo.createTask(boardId, task);

const deleteTasksByBoardId = boardId => taskRepo.deleteTasksByBoardId(boardId);

const updateTask = (boardId, taskId, data) => {
  return taskRepo.updateTask(boardId, taskId, data);
};

const deleteTask = taskId => taskRepo.deleteTask(taskId);

const deleteUserFromTasks = userId => taskRepo.deleteUserFromTasks(userId);

module.exports = {
  getTasksByBoardId,
  getAll,
  getTasksByBoardTaskIds,
  createTask,
  deleteTasksByBoardId,
  updateTask,
  deleteTask,
  deleteUserFromTasks
};
