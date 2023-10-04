const { StatusCodes, ReasonPhrases } = require('../utils/httpStatusCode')

class APIResponse {
    constructor({ reasonStatus = ReasonPhrases.OK, status = StatusCodes.OK, message, statusCode }) {
        this.message = message ? message : reasonStatus;
        this.status = status;
        this.statusCode = statusCode ? statusCode : status;
    }

    prepare(res, data, headers) {
        for (const [key, value] of Object.entries(headers)) res.append(key, value);
        return res.status(this.status).json(APIResponse.sanitize(data));
    }

    send(res, headers = {}) {
        return this.prepare(res, this, headers);
    }

    static sanitize(data) {
        const clone = {};
        Object.assign(clone, data);
        delete clone.status;
        for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
        return clone;
    }
}

class SuccessMsgResponse extends APIResponse {
    constructor({ message, statusCode }) {
        super({ reasonStatus: ReasonPhrases.OK, status: StatusCodes.OK, message, statusCode });
    }
}

class SuccessResponse extends APIResponse {
    constructor({ message, statusCode, data }) {
        super({ reasonStatus: ReasonPhrases.OK, status: StatusCodes.OK, message, statusCode });
        this.data = data;
    }

    send(res, headers = {}) {
        return super.prepare(res, this, headers);
    }
}

class CreatedResponse extends APIResponse {
    constructor({ message, statusCode, data }) {
        super({ reasonStatus: ReasonPhrases.CREATED, status: StatusCodes.CREATED, message, statusCode });
        this.data = data;
    }

    send(res, headers = {}) {
        return super.prepare(res, this, headers);
    }
}

module.exports = {
    APIResponse,
    SuccessMsgResponse,
    SuccessResponse,
    CreatedResponse
}