const { ReasonPhrases, StatusCodes } = require('../utils/httpStatusCode')

class APIError extends Error {
    constructor({ status = StatusCodes.BAD_REQUEST, message = ReasonPhrases.BAD_REQUEST }) {
        super(message);
        this.status = status;
    }
}

class BadRequestError extends APIError {
    constructor({ message = ReasonPhrases.BAD_REQUEST }) {
        super({ status: StatusCodes.BAD_REQUEST, message });
    }
}

class AuthFailureError extends APIError {
    constructor({ message = ReasonPhrases.UNAUTHORIZED }) {
        super({ status: StatusCodes.UNAUTHORIZED, message });
    }
}

class InternalError extends APIError {
    constructor({ message = ReasonPhrases.INTERNAL_SERVER_ERROR }) {
        super({ status: StatusCodes.INTERNAL_SERVER_ERROR, message });
    }
}

class NotFoundError extends APIError {
    constructor({ message = ReasonPhrases.NOT_FOUND }) {
        super({ status: StatusCodes.NOT_FOUND, message });
    }
}

class ForbiddenError extends APIError {
    constructor({ message = ReasonPhrases.FORBIDDEN }) {
        super({ status: StatusCodes.FORBIDDEN, message });
    }
}

module.exports = {
    APIError,
    BadRequestError,
    AuthFailureError,
    InternalError,
    NotFoundError,
    ForbiddenError
}