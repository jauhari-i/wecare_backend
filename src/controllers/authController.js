const services = require('../services/index');

const controller = {
  registerUser: async (req, res) => {
    let data = {
      email: req.body.email,
      password: req.body.password,
      nama: req.body.nama,
    };
    await services.registerUser(data, (err, result) => {
      err ? res.json(err) : res.json(result);
    });
  },
};

module.exports = controller;
