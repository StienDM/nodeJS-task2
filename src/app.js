const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/boards.router');
const taskRouter = require('./resources/tasks/tasks.router');
const { errorHandler } = require('./common/error-handler');
const { logger, logInfo } = require('./common/logger');
const loginRouter = require('./resources/login/login.js');
const usersService = require('./resources/users/user.service');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

process.on('uncaughtException', error => {
  logger.log('error', `captured error: ${error.message}`);
  // setTimeout(() => {
  //   throw new Error(error.message);
  // }, 1000);
});

process.on('unhandledRejection', reason => {
  logger.log('error', `Unhandled rejection detected: ${reason.message}`);
  // setTimeout(() => {
  //   throw new Error(reason.message);
  // }, 1000);
});

app.use('/login', loginRouter);
app.use('/users', [usersService.checkToken, userRouter]);
app.use('/boards', [usersService.checkToken, boardRouter, taskRouter]);
app.use(logInfo);
app.use(errorHandler);

module.exports = app;
