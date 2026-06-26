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

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));        // ✅ ADD THIS
app.use('/api/wishlist', require('./routes/wishlist')); // ✅ ADD THIS

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'ecommerce'
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});