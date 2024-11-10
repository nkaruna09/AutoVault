import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';
import mongoose from 'mongoose';
import path from 'path';
import User from './models/User.js';  // Import the User model

dotenv.config();
console.log(process.env.MONGO_URI);

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://zuhairq01:N9TjtTOQEfSwuBVx@autovault.k74lu.mongodb.net/?retryWrites=true&w=majority&appName=AutoVault", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // If login is successful, send the response
    return res.json({ message: 'Login successful', redirectTo: '/dashboard' });
  } catch (error) {
    console.log(error);
    console.log("Hello");
    return res.status(500).json({ message: 'Server error' });
  } 
});  

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  console.log("Successful registry");

  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create and save the new user
    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve the frontend if in production (optional, if you're deploying both React and Express in the same app)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('client', 'build')));  // Adjust path if needed

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));  // Use path to resolve the index.html
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
