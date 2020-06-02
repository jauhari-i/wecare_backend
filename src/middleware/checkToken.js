const jwt = require('jsonwebtoken');
const secret = require('../constants/secret');

module.exports = checkToken = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  !token &&
    res
      .json({
        message: 'invalid token',
      })
      .status(401);
  await jwt.verify(token, secret, (err, decoded) => {
    err &&
      res
        .json({
          status: 401,
          message: err,
        })
        .status(401);
    req.decoded = decoded;
    next();
  });
};
