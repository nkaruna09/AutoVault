import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import process from 'process';
import path from 'path';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Dummy data for validation
const dummyUser = {
  email: 'test@example.com',
  password: 'password123', // In a real app, never store passwords in plain text
};

// Login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Check if email and password match
  if (email === dummyUser.email && password === dummyUser.password) {
    return res.json({ message: 'Login successful', redirectTo: '/dashboard' });
  } else {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
});

// Serve the frontend if in production (optional, if you're deploying both React and Express in the same app)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build')); // Adjust path if needed

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(path.resolve(), 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
