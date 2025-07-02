import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import createDefaultAdmin from './config/defaultAdmin.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import contactRoute from "./routes/contact.js";
import orderRoutes from './routes/order.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// __dirname workaround for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static image files from the "public" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
connectDB().then(() => {
    createDefaultAdmin();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/contact", contactRoute);
app.use('/api/orders', orderRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
