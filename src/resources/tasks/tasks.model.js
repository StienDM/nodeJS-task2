const uuid = require('uuid');

class Task {
  constructor({ title, order, description, userId, boardId, columnId }) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { title, order, description, userId, boardId, columnId } = task;
    return {
      id: task.id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    };
  }
}

module.exports = Task;
