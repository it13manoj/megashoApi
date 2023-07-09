const aes256 = require('aes256');
const JWT = require('jsonwebtoken');
const { ENCRYPTION_KEY,PRIVATE_KEY } = process.env;

const encrypt = (value) => {
    return aes256.encrypt(ENCRYPTION_KEY, value);
}

const decrypt = (value) => {
    return aes256.decrypt(ENCRYPTION_KEY, value);
}

const getDateTime = (date) => {
    var datetime = date ? new Date(date) : new Date();
    datetime = datetime.getFullYear()
        + "-"
        + ('0' + (datetime.getMonth() + 1)).slice(-2)
        + "-"
        + ('0' + datetime.getDate()).slice(-2) + " "
        + ('0' + datetime.getHours()).slice(-2) + ":"
        + ('0' + datetime.getMinutes()).slice(-2) + ":"
        + ('0' + datetime.getSeconds()).slice(-2);
    return datetime;
}

const removeLastCharacter = (str) => {
    return str.trim().substring(0, (str.length - 2));
}

const generateJWT = (email, firstname, lastname) => {
    return JWT.sign({
        PRIVATE_KEY,
        email,
        firstname, 
        lastname
    }, ENCRYPTION_KEY, { expiresIn: '1h' });

}

module.exports = {
    encrypt,
    decrypt,
    getDateTime,
    removeLastCharacter,
    generateJWT
}