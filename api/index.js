import express from 'express';
import dotenv from 'dotenv';
import { db } from './utils/dbConnect.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

// database Call here....
db();

const __dirname = path.resolve();

// middleware....
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// server configuration....
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

// Routes import here....
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';

//Routes Uses here....
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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
