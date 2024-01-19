import express from 'express';
import dotenv from 'dotenv';
import { db } from './utils/dbConnect.js';

dotenv.config();
const app = express();

// Routes import here....
import userRoutes from './routes/user.routes.js';

//middlewares here....
app.use('/api/user', userRoutes);

// database Call here...
db();

// server configuration
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
