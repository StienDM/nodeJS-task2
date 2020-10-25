const Task = require('./tasks.model');

const getAll = () => Task.find({});

const getTasksByBoardId = async boardId => Task.find({ boardId });

const getTasksByBoardTaskIds = async (boardId, taskId) =>
  Task.findOne({ _id: taskId });

const createTask = async (boardId, task) => {
  task.boardId = boardId;
  return Task.create(task);
};

const deleteTasksByBoardId = async boardId =>
  (await Task.deleteMany({ boardId })).deletedCount;

const updateTask = async (boardId, taskId, data) =>
  Task.updateOne({ _id: taskId }, data);

const deleteTask = async taskId =>
  (await Task.deleteOne({ _id: taskId })).deletedCount;

const deleteUserFromTasks = async userId => {
  return Task.updateMany({ userId }, { userId: null });
};

module.exports = {
  getTasksByBoardId,
  createTask,
  getAll,
  getTasksByBoardTaskIds,
  deleteTasksByBoardId,
  updateTask,
  deleteTask,
  deleteUserFromTasks
};
