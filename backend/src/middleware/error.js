const errorMiddleware = (err, req, res, next) => {
  {
    const statusCode = err.statusCode || 500; // Default to 500 if not set
    res.status(statusCode).json({
      success: false,
      message: err.message,
    });
  }
};

export default errorMiddleware;
