const uuid = require('uuid');

class Board {
  constructor({ title = 'default title', columns = [] }) {
    this.id = uuid();
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { title, columns } = board;
    return { id: board.id, title, columns };
  }
}

module.exports = Board;
