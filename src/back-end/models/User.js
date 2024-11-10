// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define a schema for the user model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure unique emails
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user (for security)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
