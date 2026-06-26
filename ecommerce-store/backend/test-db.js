const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://iamsaad236_db_user:6pVnaliXO6xx60mG@ecommerce-cluster.kecd4v5.mongodb.net/?appName=ecommerce-cluster';

const testConnection = async () => {
  try {
    console.log('⏳ Testing connection...');
    await mongoose.connect(MONGO_URI, {
      dbName: 'ecommerce',
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ SUCCESS! Connected to MongoDB Atlas.');
    console.log('✅ Your setup is correct!');
    await mongoose.connection.close();
    console.log('🔌 Connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ CONNECTION FAILED:', error.message);
    process.exit(1);
  }
};

testConnection();