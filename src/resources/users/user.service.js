/* eslint-disable no-sync */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const { catchErrors } = require('../../common/error-handler');
const usersRepo = require('./user.db.repository');
const { deleteUserFromTasks } = require('../tasks/tasks.service');

const getAll = () => usersRepo.getAll();
const createUser = user => {
  user.password = bcrypt.hashSync(user.password, salt);
  return usersRepo.createUser(user);
};
const getLastUser = () => usersRepo.getLastUser();
const getUserById = id => usersRepo.getUserById(id);
const updateUser = (id, data) => {
  return usersRepo.updateUser(id, data);
};
const deleteUser = async id => {
  await deleteUserFromTasks(id);
  return usersRepo.deleteUser(id);
};

const getToken = async (login, password) => {
  if (!login || !password) {
    return null;
  }
  password = bcrypt.hashSync(password, salt);
  const user = await usersRepo.getPasswordByUser(login, password);
  if (user) {
    const payload = { sub: user._id, login };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 10000
    });
    return { token };
  }
};

const checkToken = catchErrors(async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, err => {
      if (err) {
        const error = new Error();
        error.status = 401;
        throw error;
      } else {
        return next();
      }
    });
  } else {
    const error = new Error();
    error.status = 401;
    throw error;
  }
});

module.exports = {
  getAll,
  createUser,
  getLastUser,
  getUserById,
  updateUser,
  deleteUser,
  getToken,
  checkToken
};
