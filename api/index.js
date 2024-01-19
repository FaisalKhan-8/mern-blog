import express from 'express';
import dotenv from 'dotenv';
import { db } from './utils/dbConnect.js';

dotenv.config();

// middleware....
const app = express();
app.use(express.json());

// Routes import here....
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

//Routes Uses here....
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// database Call here....
db();

// server configuration....
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
