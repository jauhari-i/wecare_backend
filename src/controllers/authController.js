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
  loginUser: async (req, res) => {
    let data = {
      email: req.body.email,
      password: req.body.password,
    };
    await services.loginUser(data, (err, result) => {
      err ? res.json(err) : res.json(result);
    });
  },
  verifyUser: async (req, res) => {
    await services.verifiUser(req.params.kode, (err, result) => {
      err ? res.json(err) : res.json(result);
    });
  },
};

module.exports = controller;
