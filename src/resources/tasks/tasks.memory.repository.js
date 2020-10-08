const Task = require('./tasks.model');

let tasks = [
  {
    id: 'task-1',
    title: 'test task 1',
    order: 1,
    description: '',
    userId: null,
    boardId: 'board-1',
    columnId: 'column-1'
  },
  {
    id: 'task-2',
    title: 'test task 2',
    order: 1,
    description: '',
    userId: null,
    boardId: 'board-1',
    columnId: 'column-1'
  }
];

const getAll = () => tasks;

const getTasksByBoardId = async boardId => {
  return tasks.filter(task => task.boardId === boardId);
};

const getTasksByBoardTaskIds = async (boardId, taskId) => {
  return tasks.find(task => {
    return task.id === taskId && task.boardId === boardId;
  });
};

const createTask = async (boardId, task) => {
  const newTask = new Task(task);
  newTask.boardId = boardId;
  tasks.push(newTask);
  return newTask;
};

const deleteTasksByBoardId = async boardId => {
  tasks = tasks.filter(task => task.boardId !== boardId);
};

const updateTask = async (boardId, taskId, data) => {
  const id = tasks.findIndex(task => task.id === taskId);
  if (id < 0) {
    return null;
  }
  const task = new Task(data);
  task.id = taskId;
  tasks[id] = task;
  return task;
};

const deleteTask = async taskId => {
  const index = tasks.findIndex(task => task.id === taskId);
  if (index < 0) {
    return false;
  }
  tasks.splice(index, 1);
  return true;
};

const deleteUserFromTasks = async userId => {
  tasks = tasks.map(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
    return task;
  });
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
