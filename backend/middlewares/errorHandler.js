import { ApiError } from "../utils/ApiError.js";

// This is the error-handling middleware
const errorHandler = (err, req, res, next) => {
  // If the error is an instance of ApiError, use the custom error details
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message || "Something went wrong",
      errors: err.errors || [],
    });
  }

  // For unexpected errors (not ApiError), send a generic 500 error
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
  });
};

export default errorHandler;
