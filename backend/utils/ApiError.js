class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message); // Call the parent class (Error) constructor with the message
    this.statusCode = statusCode; // HTTP status code (e.g., 400, 500)
    this.data = null; // Optional: you can set this to hold any data related to the error
    this.success = false; // Success flag, false since this is an error
    this.errors = errors; // Array to hold specific errors, useful for validation or other multiple errors

    if (stack) {
      // If a custom stack trace is provided, use it
      this.stack = stack;
    } else {
      // Otherwise, capture the current stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
