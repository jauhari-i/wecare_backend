const express = require('express');
const app = express();

const controller = require('../controllers/authController');

app.post('/register/user', controller.registerUser);
app.get('/testing', (req, res) => res.send('Hello'));

module.exports = app;
