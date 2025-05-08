const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const cropRoutes = require("./routes/cropRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Log the connection URI (without sensitive credentials)
    const redactedUri = process.env.MONGODB_URI.replace(
      /mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/,
      "mongodb$1://**redacted**:**redacted**@"
    );
    console.log(`Attempting to connect to MongoDB at ${redactedUri}`);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      w: "majority",
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    console.error(
      "Connection URI (redacted):",
      process.env.MONGODB_URI.replace(/:[^@]*@/, ":****@")
    );
    process.exit(1);
  }
};

// Call the connect function
connectDB();

// Set up event listeners for MongoDB connection
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB");
});

// Routes
app.use("/api/crops", cropRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
