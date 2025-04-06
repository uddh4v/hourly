import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import express from "express";
import logger from "./logger.js"; // Import custom logger
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const configureMiddleware = (app) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(cors());
  dotenv.config();
  app.use(logger); // Custom logger middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  );
  app.use(morgan("dev"));
  app.use(compression());
  app.use(cookieParser());
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
  // app.use(errorMiddleware);

  // Rate limiting middleware (prevents abuse)
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000,
    message: "Too many requests, please try again later.",
    headers: true,
  });
  app.use(limiter);
};

export default configureMiddleware;
