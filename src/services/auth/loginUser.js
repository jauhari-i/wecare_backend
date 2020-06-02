const decryptPass = require('../../config/decryptPass');

const User = require('../../models/User');

const jwt = require('jsonwebtoken');
const secret = require('../../constants/secret');

module.exports = loginUser = async (data, cb) => {
  let validation = [];

  !data.email &&
    validation.push({
      error: 'Email tidak boleh kosong!',
    });
  !data.password &&
    validation.push({
      error: 'Password tidak boleh kosong!',
    });

  validation.length > 0 && cb({ success: 0, status: 500, validation });
  await User.findOne({ email: data.email })
    .then(async (user) => {
      if (!user)
        return cb({ success: 0, status: 500, msg: 'Email tidak ditemukan' });
      if (!user.verified || user.verified === 0)
        return cb({
          success: 0,
          status: 500,
          msg: 'Email belum terverifikasi',
        });

      const isMatch = await decryptPass(data.password, user.password);
      const token = jwt.sign(
        {
          idUser: user._id,
          role: 'user',
        },
        secret,
        { expiresIn: '24h' }
      );
      !isMatch && cb({ success: 0, status: 500, msg: 'Password tidak cocok' });
      User.findOneAndUpdate(
        { email: user.email },
        { lastLogin: Date.now() },
        (err, last) => {
          err && cb({ success: 0, status: 500, err });
          cb(null, {
            success: 1,
            status: 200,
            token: token,
            msg: 'Login berhasil',
            lastLogin: Date.now(),
          });
        }
      );
    })
    .catch((err) => cb({ success: 0, status: 500, err }));
};
