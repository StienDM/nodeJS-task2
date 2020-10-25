const boardsRepo = require('./boards.db.repository');
const taskService = require('../tasks/tasks.service');

const getAll = () => boardsRepo.getAll();

const createBoard = data => boardsRepo.createBoard(data);

const getBoardById = id => boardsRepo.getBoardById(id);

const updateBoard = (id, data) => {
  return boardsRepo.updateBoard(id, data);
};

const deleteBoard = async id => {
  await taskService.deleteTasksByBoardId(id);
  return boardsRepo.deleteBoard(id);
};

module.exports = {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
