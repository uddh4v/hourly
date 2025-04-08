export const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        status: "failed",
        message: "Not allowed",
      });
    }
    next();
  };
};
