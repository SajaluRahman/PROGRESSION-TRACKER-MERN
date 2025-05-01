
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  console.log('Signup body:', req.body);
  try {
    const { email, password, name, country } = req.body;
    if (!email || !password || !name || !country) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name, country });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user: { name: user.name, email: user.email, country: user.country } });
  } catch (err) {
    console.error('Signup error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  console.log('Login body:', req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { name: user.name, email: user.email, country: user.country } });
  } catch (err) {
    console.error('Login error:', err.message, err.stack);
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name email country');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user: { name: user.name, email: user.email, country: user.country } });
  } catch (err) {
    console.error('Verify token error:', err.message, err.stack);
    res.status(401).json({ message: 'Invalid token' });
  }
};
