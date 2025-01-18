const mongoose = require('mongoose');
require('dotenv').config();
exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// module.exports = connectDB;

// async function connectToMongodb(url) {
//     return mongoose.connect(url);
//   }
  
//   module.exports = {connectToMongodb, connectDB};
  