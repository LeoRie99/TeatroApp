import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/userModel.js';
import Admin from './models/adminModel.js';

const saltRounds = 10;
const dbUri = 'mongodb://localhost:27017/theatrical'; 

async function hashPasswordsForUsers() {
  try {
    const users = await User.find();
    for (const user of users) {
      if (user.password && !user.password.startsWith('$2b$')) {
        user.password = await bcrypt.hash(user.password, saltRounds);
        await user.save();
      }
    }
    console.log('Users passwords updated successfully');
  } catch (error) {
    console.error('Error updating user passwords:', error);
  }
}

async function hashPasswordsForAdmins() {
  try {
    const admins = await Admin.find();
    for (const admin of admins) {
      if (admin.contraseña && !admin.contraseña.startsWith('$2b$')) {
        admin.contraseña = await bcrypt.hash(admin.contraseña, saltRounds);
        await admin.save();
      }
    }
    console.log('Admins passwords updated successfully');
  } catch (error) {
    console.error('Error updating admin passwords:', error);
  }
}

async function migrate() {
  try {
    await mongoose.connect(dbUri);
    console.log('Connected to the database');

    await hashPasswordsForUsers();
    await hashPasswordsForAdmins();

    await mongoose.disconnect();
    console.log('Disconnected from the database');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

migrate();