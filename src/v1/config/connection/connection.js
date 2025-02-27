const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected for v1: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to v1 database: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
