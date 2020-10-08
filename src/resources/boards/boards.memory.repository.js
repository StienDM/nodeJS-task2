const Board = require('./boards.model');
const uuid = require('uuid');
const taskService = require('../tasks/tasks.service');

const boards = [
  {
    id: 'board-1',
    title: 'default board',
    columns: [{ id: 'column-1', title: 'default column', order: 1 }]
  }
];

const getAll = async () => {
  return boards;
};

const getBoardById = async id => {
  return boards.find(board => board.id === id);
};

const createBoard = async board => {
  const newBoard = new Board(board);
  for (let i = 0; i < newBoard.columns.length; i++) {
    newBoard.columns[i].id = uuid();
  }
  boards.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, data) => {
  const boardId = boards.findIndex(board => board.id === id);
  if (boardId < 0) {
    return null;
  }
  boards[boardId].title = data.title ? data.title : boards[boardId].title;
  boards[boardId].columns = data.columns
    ? data.columns
    : boards[boardId].columns;
  return boards[boardId];
};

const deleteBoard = async id => {
  const index = boards.findIndex(board => board.id === id);
  if (index < 0) {
    return false;
  }
  await taskService.deleteTasksByBoardId(id);
  boards.splice(index, 1);
  return true;
};

module.exports = {
  getAll,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};
