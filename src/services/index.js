const registerUser = require('./auth/registerUser');
const loginUser = require('./auth/loginUser');

const services = {
  registerUser,
  loginUser,
};

module.exports = services;
