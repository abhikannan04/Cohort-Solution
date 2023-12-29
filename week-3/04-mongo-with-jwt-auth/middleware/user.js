const jwt =  require("jsonwebtoken");
const {JWT_SECRETKEY} = require("../config.js");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const token  =  req.headers.authorization;
    const word = token.split(" ");
    const jwtToken = word[1];

    try{

        const decodedToken  = jwt.verify(jwtToken,JWT_SECRETKEY);
        if(decodedToken.username){
            // middlewares can be used to pass the values as well as to stop the request and pass the req to next middleware
            req.username = decodedToken.username;
            next();
        }else{
            res.status(403).json({msg:"Invalid Authentication"});
    }
    }catch(e){
        res.status(403).json({
            err: "Incorrect Input"
        })
    }
}

module.exports = userMiddleware;