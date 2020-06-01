const bcrypt = require('bcryptjs');
const util = require('util');

module.exports = bcrypt.hash = util.promisify(bcrypt.hash);
