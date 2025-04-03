import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer token"
    if (!token) {
      return res.status(401).json({ status: "failed", message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable for security
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(401).json({ status: "failed", message: "Invalid or expired token" });
  }
};

export default authMiddleware;
