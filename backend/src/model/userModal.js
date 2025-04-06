import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true, lowercase: true },
    avatar: { type: String, default: "", required: false },
    password: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: false },
    designation: { type: String, required: false },
    isApproved: { type: Boolean, default: false }, // Field to track approval status
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
