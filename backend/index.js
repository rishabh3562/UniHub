// index.mjs
import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import fileUpload from "express-fileupload";
import path from "path";
import errorMiddleware from "./middlewares/error.js";
import dotenv from "dotenv";
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
dotenv.config({ path: "../.env" });
}
app.use(errorMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());

// Route Imports
import alumni from "./routes/alumniRoutes.js";
import user from "./routes/userRoute.js";
import student from "./routes/studentRoutes.js";
import job from "./routes/jobRoutes.js";
import event from "./routes/eventRoutes.js";

app.use("/api/v1/alumni/", alumni);
app.use("/api/v1/user/", user);
app.use("/api/v1/job/", job);
app.use("/api/v1/student/", student);
app.use("/api/v1/event/", event);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Alumni API",
  });
});

// Middleware for Errors


export default app;
