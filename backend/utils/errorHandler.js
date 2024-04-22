class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Capture the stack trace
        this.captureStackTrace();
    }

    captureStackTrace() {
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorHandler);
        } else {
            this.stack = (new Error()).stack;
        }
    }
}

export default ErrorHandler;
