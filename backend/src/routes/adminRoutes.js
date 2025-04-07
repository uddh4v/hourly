import express from "express";
import User from "../model/userModal.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();
// approve user

router.put("/approve/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }
    user.isApproved = true;
    await user.save();

    res.status(200).json({
      status: "success",
      message: `User with Id ${userId} has been approved`,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Internal server Issue",
      error: error.message,
    });
  }
});

// delete user

router.delete("/delete/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  if (!req.user?.role) {
    return res.status(403).json({
      status: "failed",
      message: "Unauthorized access",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "failed",
      message: "You do not have permission to delete users",
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(userId);

    e;
    return res.status(200).json({
      status: "success",
      message: `User with ID ${userId} has been deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;
