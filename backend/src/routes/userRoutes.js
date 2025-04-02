import express from "express";
import bcrypt from "bcryptjs";
import User from "../model/userModal.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: `User with this ${email} already exits` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    newUser.save();
    res.status(201).json({ message: `Account for ${name} has been created` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
