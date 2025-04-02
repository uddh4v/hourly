import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import express from "express";
import logger from "./logger.js"; // Import custom logger

const configureMiddleware = (app) => {
  app.use(logger); // Custom logger middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(compression());
  app.use(cookieParser());

  // Rate limiting middleware (prevents abuse)
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);
};

export default configureMiddleware;
