import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();

app.use(express.json()); // allow use to accept json data in the req.body

app.use('/api/products', productRoutes);
app.listen(5000, () => {
  connectDB();
  console.log('Server is running on http://localhost:5000');
});
