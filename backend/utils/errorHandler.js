class ErrorHandler extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode

        Error.captureStackTra(this, this.constructor)

    }
}

module.exports = ErrorHandler; 