const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchErrors } = require('../../common/error-handler');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const user = await usersService.getUserById(req.params.id);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      const error = new Error();
      error.status = 404;
      throw error;
    }
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const user = await usersService.createUser(req.body);
    res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const user = await usersService.updateUser(req.params.id, req.body);
    if (user) {
      await res.status(200).json(User.toResponse(user));
    } else {
      const error = new Error();
      error.status = 401;
      throw error;
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    if (await usersService.deleteUser(req.params.id)) {
      res.status(204).json();
    } else {
      const error = new Error();
      error.status = 401;
      throw error;
    }
  })
);

module.exports = router;
