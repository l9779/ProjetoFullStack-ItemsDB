const bcrypt = require('bcrypt');

const SALT = parseInt(process.env.SALT_PWD);

class PasswordHelper {
  static hashPassword(pass) {
    return bcrypt.hashSync(pass, SALT);
  }

  static comparePassword(pass, hash) {
    return bcrypt.compareSync(pass, hash);
  }
}

module.exports = PasswordHelper;
