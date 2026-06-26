// ===== DNS FIX FOR MONGODB ATLAS =====
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
// =====================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Add this line with other routes
app.use('/api/auth', require('./routes/auth'));

// Routes
app.use('/api/products', require('./routes/products'));

// MongoDB Connection with DNS fix
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'ecommerce',
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Retry after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});