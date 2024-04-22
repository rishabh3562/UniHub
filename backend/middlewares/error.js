import ErrorHandler from "../utils/errorHandler.js";

export default function(err, req, res, next)  {
  console.log("error middlewares")
  console.log(err.stack);
  console.log("error middlewares err.statusCode", err.statusCode);
  console.log("error middlewares err.message", err.message);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err.message = message;
    err.statusCode = 400;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err.message = message;
    err.statusCode = 400;
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err.message = message;
    err.statusCode = 400;
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err.message = message;
    err.statusCode = 400;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
