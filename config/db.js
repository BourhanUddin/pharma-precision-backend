const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // This looks for MONGO_URI in your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Connection Error: ${error.message}`);
    // Exit process with failure if DB connection fails
    process.exit(1); 
  }
};

module.exports = connectDB;