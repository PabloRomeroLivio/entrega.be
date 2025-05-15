import User from '../models/User.js';
import bcrypt from 'bcrypt';

class UserManager {
  async createUser(email, password, role = 'user') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    return await newUser.save();
  }

  async getUserByEmail(email) {
    return await User.findOne({ email });
  }
}

export default UserManager;
