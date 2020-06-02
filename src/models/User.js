const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
    default: 'default.png',
  },
  noTlp: {
    type: String,
    required: false,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    required: false,
  },
  verified: {
    type: Number,
    required: true,
    default: 0,
  },
  role: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
