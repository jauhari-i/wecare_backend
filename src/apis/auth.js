const express = require('express');
const app = express();

const controller = require('../controllers/authController');

app.post('/register/user', controller.registerUser);
app.post('/login/user', controller.loginUser);
app.get('/verify/kode/:kode', controller.verifyUser);

module.exports = app;
