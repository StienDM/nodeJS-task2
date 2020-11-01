const router = require('express').Router();
const { catchErrors } = require('../../common/error-handler');
const userService = require('../users/user.service');

router.route('/').post(
  catchErrors(async (req, res) => {
    const { login, password } = req.body;
    const token = await userService.getToken(login, password);
    if (token) {
      res.send(token);
    } else {
      const error = new Error();
      error.status(401);
      throw error;
    }
  })
);

module.exports = router;
