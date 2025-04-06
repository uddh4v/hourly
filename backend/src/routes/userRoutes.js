import express from "express";
import bcrypt from "bcryptjs";
import User from "../model/userModal.js";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/fileUpload.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const validateUser = [
  body("firstName").notEmpty().withMessage("firstName is required"), // Ensure name is not empty
  body("lastName").notEmpty().withMessage("lastName is required"), // Ensure name is not empty
  body("email").isEmail().withMessage("Please provide a valid email address"), // Ensure email is a valid format
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"), // Ensure password length is at least 6 characters
];

//login validation
const validateLogin = [
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];
//create user
router.post(
  "/create",
  upload.single("avatar"),
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        role,
        department,
        designation,
      } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: `failed`,
          message: `User with this ${email} already exits`,
        });
      }

      let avatar;

      if (req.file) {
        // Store relative path to the file
        avatar = `/uploads/${req.file.filename}`;
      } else {
        const firstNameInitial = firstName.split(" ")[0][0].toUpperCase(); // First letter of first name
        const lastNameInitial = lastName.split(" ")[0][0].toUpperCase();

        avatar = firstNameInitial + lastNameInitial;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      let isApproved = role === "admin" ? true : false; // Admin gets auto-approved, others need approval

      const newUser = await User.create({
        firstName,
        lastName,
        email,
        avatar,
        password: hashedPassword,
        role,
        department,
        designation,
        isApproved,
      });
      console.log(newUser);

      res.status(201).json({
        status: `success`,
        message:
          role === "admin"
            ? `Account for ${email} has been created successfully`
            : `Account for ${email} has been created and is pending approval`,
        userId: newUser._id,
      });
    } catch (error) {
      res.status(500).json({
        status: `failed`,
        message: "Server error",
        error: error.message,
      });
    }
  }
);

router.post("/login", validateLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    if (!user.isApproved) {
      return res.status(403).json({
        status: "failed",
        message: "Your account is pending approval",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success",
      message: `${user.firstName} ${user.lastName} Logged In Successfully`,
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
});

router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const requestUserId = req.params.userId;
    const tokenUserId = req.userId; // Now it will be defined

    if (requestUserId !== tokenUserId) {
      return res.status(403).json({ status: "failed", message: "Not allowed" });
    }

    const user = await User.findOne(
      { _id: requestUserId },
      { password: false, __v: false }
    );

    if (!user) {
      res.status(404).json({ status: "failed", message: "User not found" });
      return;
    }
    res.status(200).json({
      status: "success",
      message: "User data fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
export default router;
