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
mongoose.connect(process.env.MONGO_URI, {
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
    return res.status(500).json({ message: 'Server error' });
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
