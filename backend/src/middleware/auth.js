import jwt from "jsonwebtoken";

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
