import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    empId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true, lowercase: true },
    avatar: { type: String, default: "", required: false },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "manager"], default: "user" },
    department: { type: String, required: false },
    designation: { type: String, required: false },
    isApproved: { type: Boolean, default: false }, // Field to track approval status
    location: { type: String, required: false },
    isRemote: { type: Boolean, default: false },
    projects: [{ type: String }], // Or use ObjectId if referencing another collection
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
