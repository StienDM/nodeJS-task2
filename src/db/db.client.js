const mongoose = require('mongoose');
const userService = require('../resources/users/user.service');
console.log(process.env.MONGO_CONNECTION_STRING);
const connect = runServer => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', () => {
    console.log('we are connected');
    runServer();

    userService.createUser({
      name: 'admin',
      login: 'admin',
      password: 'admin'
    });
  });
};

module.exports = { connect };
