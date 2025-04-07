import express from "express";
import configureMiddleware from "./src/middleware/middleware.js";
import "dotenv/config"; // Loads .env globally
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
// import swaggerSpec from "./src/swagger/swaggerConfig.js";
// import swaggerUi from "swagger-ui-express";

const app = express();

const PORT = process.env.PORT;

// Apply Middleware
configureMiddleware(app);

// DataBase connection
connectDB();

// Routes
app.use("/api/user", userRoutes);

app.use("/api/admin", adminRoutes);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ message: "Hello Express" });
});
console.log("Starting the server");
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
