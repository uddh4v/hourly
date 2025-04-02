const logger = (req, res, next) => {
  const start = Date.now(); // Start time
  res.on("finish", () => {
    const duration = Date.now() - start; // Calculate duration
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} - ${
        res.statusCode
      } (${duration}ms)`
    );
  });
  next();
};

export default logger;
