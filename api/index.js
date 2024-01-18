import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};
db();

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
