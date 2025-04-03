import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import express from "express";
import logger from "./logger.js"; // Import custom logger
// import errorMiddleware from "./error.js";

const configureMiddleware = (app) => {
  app.use(logger); // Custom logger middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(compression());
  app.use(cookieParser());
  // app.use(errorMiddleware);

  // Rate limiting middleware (prevents abuse)
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100,
    message: "Too many requests, please try again later.",
    headers: true,
  });
  app.use(limiter);
};

export default configureMiddleware;
