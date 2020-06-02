const registerUser = require('./auth/registerUser');
const loginUser = require('./auth/loginUser');
const verifiUser = require('./auth/verifIUser');

const services = {
  registerUser,
  loginUser,
  verifiUser,
};

module.exports = services;
