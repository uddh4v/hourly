import jwt from "jsonwebtoken";
import User from "../model/userModal.js"; // Make sure the path is correct

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("role");

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    // req.user = user;
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({
      status: "failed",
      message: "Invalid token",
      error: err.message,
    });
  }
};

export default authMiddleware;
