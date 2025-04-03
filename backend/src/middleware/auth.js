import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1]; // Extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    req.userId = decoded.userId; // Attach userId to request
    next();
  } catch (err) {
    return res.status(401).json({ status: "failed", message: "Invalid token" });
  }
};

export default authMiddleware;
