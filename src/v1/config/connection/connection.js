const mongoose = require("mongoose");

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/db_name");
    console.log(`MongoDB Connected for v1: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to v1 database: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
