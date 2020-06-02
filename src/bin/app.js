require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const log = require('morgan');
const bp = require('body-parser');
const app = express();
const port = 8000;

app.use(cors());
app.use(log('common', { buffer: true }));
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  },
  (err) => {
    err ? console.log(err) : console.log('Connected to database');
  }
);

console.log(process.env);

const api = require('../apis/index');

app.use('/api/auth', api.authApi);

app.listen(port, () => console.log(`WeCare app listening on port ${port}!`));
