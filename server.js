import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import authRoutes from './src/routes/authRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import taskRoutes from './src/routes/taskRoutes.js';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();

// CORS configuration
app.use(
  cors(
  //   {
  //   origin: 'http://localhost:5173',
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // }
)
);

// Middleware to validate Content-Type
const validateContentType = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.headers['content-type'] !== 'application/json') {
    return res.status(415).json({ message: 'Content-Type must be application/json' });
  }
  next();
};

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(validateContentType);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log('MONGO_URL:', process.env.MONGO_URL ? 'Set' : 'Not set');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
});