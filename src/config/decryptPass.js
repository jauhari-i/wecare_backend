const bcrypt = require('bcryptjs');
const util = require('util');

module.exports = bcrypt.compare = util.promisify(bcrypt.compare);
