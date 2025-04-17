import express from "express";
import bcrypt from "bcryptjs";
import User from "../model/userModal.js";
import { body, validationResult } from "express-validator";
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/fileUpload.js";
import { nanoid } from "nanoid";
import { requireRole } from "../middleware/requiredRole.js";
import Project from "../model/projectModel.js";
import mongoose from "mongoose";
// import { sendEmail } from "../utils/mailer.js";

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

router.get(
  "/alluser",
  authMiddleware,
  requireRole("admin"),
  async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ status: "failed", message: err.message });
    }
  }
);

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
        location,
        isRemote,
        projects = [],
      } = req.body;

      // Normalize and sanitize projects
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

      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);

      let isApproved = role === "admin" ? true : false; // Admin gets auto-approved, others need approval
      const empId = `${nanoid(5)}`;

      const projectNames = Array.isArray(projects)
        ? projects
        : typeof projects === "string"
          ? [projects]
          : [];

      const validProjects = await Project.find({
        _id: { $in: projectNames },
        // projectName: { $in: projectNames },
      }).select("projectName");

      const projectIds = validProjects.map((project) => project._id);

      const newUser = await User.create({
        empId,
        firstName,
        lastName,
        email,
        avatar,
        password: hashedPassword,
        role,
        department,
        designation,
        location,
        isRemote: isRemote === "true", // Make sure this is boolean
        projects: projectIds,
        isApproved,
      });
      console.log(newUser.projects);

      // send email

      // const message =
      //   role === "admin"
      //     ? `Account for ${email} has been created successfully.`
      //     : `Account for ${email} has been created and is pending approval.`;

      // const emailSubject =
      //   role === "admin"
      //     ? "Your Admin Account Has Been Created"
      //     : "Your Account is Pending Approval";

      // const emailHtml =
      //   role === "admin"
      //     ? `<h2>Hello ${firstName},</h2><p>Your admin account has been created successfully. You can now log in and manage the system.</p>`
      //     : `<h2>Hello ${firstName},</h2><p>Your account has been created and is currently pending approval. You will be notified once it's activated.</p>`;

      // await sendEmail(email, emailSubject, message, emailHtml);

      res.status(201).json({
        status: `success`,
        message:
          role === "admin"
            ? `Account for ${email} has been created successfully`
            : `Account for ${email} has been created and is pending approval`,
        userId: newUser._id,
      });
    } catch (error) {
      console.error("🔴 Error message:", error.message);
      console.error("📦 Full error object:", error);
      console.error("📄 Stack trace:", error.stack);
      res.status(500).json({
        status: `failed`,
        message: "Server error",
        error: error.message,
      });
    }
  }
);

//get user by id
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const requestUserId = req.params.userId;
    const tokenUserId = req.user.userId;

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
