const encryptPass = require('../../config/encryptPass');
const sendVerificationEmail = require('../../middleware/sendVeificationEmail');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

module.exports = registerUser = async (data, cb) => {
  let validation = [];

  !data.email &&
    validation.push({
      error: 'Email tidak boleh kosong!',
    });
  !data.password &&
    validation.push({
      error: 'Password tidak boleh kosong!',
    });
  !data.nama &&
    validation.push({
      error: 'Nama tidak boleh kosong',
    });

  validation.length > 0 && cb({ success: 0, status: 500, validation });
  const encPass = await encryptPass(data.password, 10);
  await User.create({ email: data.email, password: encPass, name: data.nama })
    .then((data) => {
      let tokenVerifikasi = jwt.sign(
        { email: data.email },
        'verifikasiwecare',
        { expiresIn: '30m' }
      );
      sendVerificationEmail(data.email, tokenVerifikasi, (err, success) => {
        err && cb({ success: 0, status: 500, msg: err });
        cb(null, {
          success: 1,
          status: 200,
          msg: 'Registrasi berhasil',
          data: {
            created: data.createdAt,
            additional: success,
          },
        });
      });
    })
    .catch((err) => {
      err.code === 11000 &&
        cb({ success: 0, status: 500, msg: 'Email telah dipakai' });
      cb({ success: 0, status: 500, error: err });
    });
};
