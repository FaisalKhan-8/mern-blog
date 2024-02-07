import express from 'express';
import dotenv from 'dotenv';
import { db } from './utils/dbConnect.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

// middleware....
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// database Call here....
db();
// server configuration....
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// Routes import here....
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';

//Routes Uses here....
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

// Error middleware....
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
