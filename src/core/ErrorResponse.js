'use strict'

const StatusCode = {
    FORBIDEN: 403,
    CONFILCT: 409
}

const ReasonStatusCode = {
    FORBIDEN: 'Bad request error',
    CONFILCT: 'Confilct error'
}

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFILCT, statusCode = StatusCode.FORBIDEN) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFILCT, statusCode = StatusCode.FORBIDEN) {
        super(message, statusCode)
    }
}

module.exports = {
    ConflictRequestError, BadRequestError
}

