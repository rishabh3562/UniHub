import app from "./index.js";
import express from "express";

import connectDatabase from "./configs/db.js";
import dotenv from "dotenv";
import errorHandler from "./middlewares/error.js";

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: "../.env" });
}

// Connecting to database
connectDatabase();

// Mount routes
import "./routes/alumniRoutes.js";
import "./routes/userRoute.js";
import "./routes/studentRoutes.js";
import "./routes/jobRoutes.js";
import "./routes/eventRoutes.js";

// Global error handling middleware
app.use(errorHandler);

// Test route
app.get("/test", (req, res) => {
    res.send("Hello World");
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});
