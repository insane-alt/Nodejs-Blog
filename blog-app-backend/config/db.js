const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use 127.0.0.1 instead of localhost to force IPv4
    const mongoURI = process.env.MONGO_URI.replace('localhost', '127.0.0.1');
    
    const conn = await mongoose.connect(mongoURI, {
      // Remove deprecated options
      serverSelectionTimeoutMS: 5000
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

