const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('../config/env');
const AppError = require('../utils/AppError');
const userRepository = require('../repositories/userRepository');

const authService = {
  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    // Uniform failure message — don't reveal which field was wrong.
    if (!user || user.status !== 'active') {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');

    const token = jwt.sign(
      { sub: user.id, name: user.name, email: user.email, role: user.role },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn }
    );
    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  },
};

module.exports = authService;
