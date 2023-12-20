const jwt = require('jsonwebtoken');
const jwtPassword = "secret";
const z =  require("zod");

function uservalidaton(username , password){
    const schema  = z.object({
        username : z.string().email(),
        password : z.string().min(6)
    })

    const userdata =  {
        username:username,
        password:password
    }

    const result = schema.safeParse(userdata);

    return result.success
}
function signJwt(username, password) {
    if(uservalidaton(username,password)){
        const token =  jwt.sign({username:username , password:password},jwtPassword);
        return token;
    }else{
        return null;
    }
    // console.log(token);
}

function verifyJwt(token) {
    try{
        const verify =  jwt.verify(token,jwtPassword);
        return true;
    }catch(err){
        return false;
    }
    // console.log(verify);
}

function decodeJwt(token) {
    const decode =  jwt.decode(token);
    if(decode){
        return true
        }else{
        return false
        }
    // console.log(decode);
}

module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword
}