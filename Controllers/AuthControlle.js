const jwt = require('jsonwebtoken');
const { PRIVATE_KEY, ENCRYPTION_KEY } = process.env
const responseHelper = require("../helpers/Response");
const openUrls = [
    'localhost:5000',
    '1363-112-196-45-10.ngrok.io'
];

exports.auth = (req, res, next) => {
    console.log(req.headers);
    const referer = req.headers.host;
    const login = req.path.split('/')[4]
    if (login === 'login') {
        next();
    } else if(referer) {
        if(openUrls.includes(referer)) {
            next();
        } else {
            res.send(responseHelper[401]);
        }
    } else {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        console.log(token)
        try {
            const verified = jwt.verify(token, ENCRYPTION_KEY);
            if (verified) {
                next()
            } else {
                res.send(responseHelper[401]);
            }
        } catch (error) {
            res.send(responseHelper[401]);
        }

    }
};


const sendError = (Response, Error) => {
    if (Error.errno === 500) {
        responseHelper[500].data = [];
        Response.send(responseHelper[500]);
    } else {
        const errorObj = {};
        errorObj.status = Error.errno;
        errorObj.message = Error.sqlMessage ? Error.sqlMessage : Error.code;
        errorObj.hasError = true;
        errorObj.data = Error.sql;
        Response.send(errorObj);
    }
}