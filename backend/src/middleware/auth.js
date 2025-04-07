import jwt from "jsonwebtoken";
import User from "../model/userModal.js"; // Make sure the path is correct

// const authMiddleware = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res
//         .status(401)
//         .json({ status: "failed", message: "Unauthorized - No token" });
//     }

//     const token = authHeader.split(" ")[1]; // Extract token

//     // Debug log (optional - remove in prod)
//     console.log("TOKEN:", token);
//     console.log("JWT_SECRET:", process.env.JWT_SECRET);

//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//     const user = await User.findById(decoded.userId).select("role");

//     if (!user) {
//       return res.status(404).json({
//         status: "failed",
//         message: "User not found",
//       });
//     }

//     req.user = user; // Attach user role to req.user
//     next();
//   } catch (err) {
//     console.error("JWT Error:", err.message);
//     return res.status(401).json({
//       status: "failed",
//       message: "Invalid token",
//       error: err.message,
//     });
//   }
// };

// export default authMiddleware;

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    const user = await User.findById(decoded.userId).select("role");
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    req.user = user; // Attach the entire user object to req.user
    next();
  } catch (err) {
    return res.status(401).json({ status: "failed", message: "Invalid token" });
  }
};

export default authMiddleware;
