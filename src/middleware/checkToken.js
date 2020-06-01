const jwt = require('jsonwebtoken');
const secret = require('../constants/secret');

module.exports = checkToken = async (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res
          .json({
            status: 401,
            message: err,
          })
          .status(401);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res
      .json({
        message: 'invalid token',
      })
      .status(401);
  }
};
