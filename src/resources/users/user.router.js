const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUserById(req.params.id);
  if (user) {
    res.status(200).json(User.toResponse(user));
  } else {
    res.status(404).json();
  }
});

router.route('/').post(async (req, res) => {
  const user = await usersService.createUser(req.body);
  res.status(200).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const user = await usersService.updateUser(req.params.id, req.body);
  if (user) {
    await res.status(200).json(User.toResponse(user));
  } else {
    res.status(401).json();
  }
});

router.route('/:id').delete(async (req, res) => {
  if (await usersService.deleteUser(req.params.id)) {
    res.status(204).json();
  } else {
    res.status(401).json();
  }
});

module.exports = router;
