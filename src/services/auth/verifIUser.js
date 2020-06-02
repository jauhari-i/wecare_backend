const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports = verifiUser = async (kode, cb) => {
  await jwt.verify(kode, 'verifikasiwecare', async (err, decoded) => {
    if (err) {
      cb({ success: 0, status: 500, msg: 'Kode tidak valid' });
    }
    let email = decoded.email;
    await User.findOneAndUpdate(
      { email: email },
      { verified: 1 },
      (err, verified) => {
        err && cb({ success: 0, status: 500, msg: 'Internal server error' });
        cb({
          success: 1,
          status: 200,
          msg: verified.email + ' telah diverifikasi',
          data: {
            verified: true,
          },
        });
      }
    );
  });
};
