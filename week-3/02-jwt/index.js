const jwt = require('jsonwebtoken');
const jwtPassword = "secret";

function signJwt(username, password) {
    const token =  jwt.sign({username:username},jwtPassword);
    // console.log(token);
}

function verifyJwt(token) {
    const verify =  jwt.verify(token,jwtPassword);
    // console.log(verify);
}

function decodeJwt(token) {
    const decode =  jwt.decode(token);
    // console.log(decode);
}

module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword
}