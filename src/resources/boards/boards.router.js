const router = require('express').Router();
const boardsService = require('./boards.service');
const Board = require('./boards.model');
const { catchErrors } = require('../../common/error-handler');

router.route('/').get(
  catchErrors(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const board = await boardsService.getBoardById(req.params.id);
    if (board) {
      res.json(Board.toResponse(board));
    } else {
      const error = new Error();
      error.status = 404;
      throw error;
    }
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const board = await boardsService.createBoard(req.body);
    res.status(200).json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const board = await boardsService.updateBoard(req.params.id, req.body);
    if (board) {
      res.status(200).json(Board.toResponse(board));
    } else {
      const error = new Error();
      error.status = 401;
      throw error;
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    if (await boardsService.deleteBoard(req.params.id)) {
      res.status(204).json();
    } else {
      const error = new Error();
      error.status = 404;
      throw error;
    }
  })
);

module.exports = router;
