const mongoose = require("mongoose");

async function connectDB() {
  const MONGO_URI =
    process.env.MONGO_URI ?? "mongodb://localhost:27017/task-manager-db";
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Cannot connect to DB");
    process.exit(1);
  }
}

module.exports = connectDB;
