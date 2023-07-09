module.exports = {
    // Successful Response
    200: {
        status: 'OK',
        statusCode: 200,
        message: "Passed!",
        hasError: false
    },
    201: {
        status: 'CREATED',
        statusCode: 201,
        message: "Created!",
        hasError: false
    },
    204: {
        status: 'NO_CONTENT',
        statusCode: 204,
        message: "No Content!",
        hasError: false
    },
    // Redirection Messages
    301: {
        status: 'MOVED',
        statusCode: 301,
        message: "Moved Permanently!",
        hasError: true
    },
    // Client Errors
    400: {
        status: 'BAD_REQUEST',
        statusCode: 400,
        message: "Bad Request!",
        hasError: true
    },
    401: {
        status: 'UNAUTHORIZED',
        statusCode: 401,
        message: "Unauthorized!",
        hasError: true
    },
    403: {
        status: 'FORBIDDEN',
        statusCode: 403,
        message: "Forbidden!",
        hasError: true
    },
    404: {
        status: 'NOT_FOUND',
        statusCode: 404,
        message: "Not Found!",
        hasError: true
    },
    413: {
        status: 'PAYLOAD_TOO_LARGE',
        statusCode: 413,
        message: "Entity Too Large!",
        hasError: true
    },
    // Server Response
    500: {
        status: 'INTERNAL_SERVER_ERROR',
        statusCode: 500,
        message: "Internal Server Error!",
        hasError: true
    },
    502: {
        status: 'BAD_GATEWAY',
        statusCode: 502,
        message: "Bad Gateway!",
        hasError: true
    },
    503: {
        status: 'SERVICE_UNAVAILABLE',
        statusCode: 503,
        message: "Service Unavailable!",
        hasError: true
    },
    // Configuration Error
    999: {
        status: 'CONFIGURATION_ERROR',
        statusCode: 999,
        message: "Schema Unavailable!",
        hasError: true
    },
    444: {
        status: 'INVALID_FIELDS',
        statusCode: 444,
        message: "Invalid Fields!",
        hasError: true
    },
}