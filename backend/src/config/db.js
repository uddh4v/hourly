import mongoose from "mongoose";
// Load environment variables from .env file

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🚀 MongoDB Connection Established Successfully! 🎉");
  } catch (error) {
    console.error("💥 MongoDB Connection Failed! ❌", error);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;
