import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/mongodb.js";
import todoRoutes from "./routes/todo.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

// Use process.env.PORT for flexibility in production environments
const PORT = 5000 || process.env.PORT;
const app = express();

// Connect to MongoDB and handle errors
connectDB().catch((error) => {
  console.error("MongoDB connection failed:", error);
  process.exit(1);
});

// Middleware
app.use(cors()); // Handle Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON payloads

// Routes
app.use("/api/todos", todoRoutes); // Prefix for all Todo-related routes

// Health check route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global error handling middleware (should be after all routes)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
