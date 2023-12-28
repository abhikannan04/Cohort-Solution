const jwt =  require("jsonwebtoken");
const {JWT_SECRETKEY} = require("../config.js");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token  =  req.headers.authorization;
    const word = token.split(" ");
    const jwtToken = word[1];

    try{

        const decodedToken  = jwt.verify(jwtToken,JWT_SECRETKEY);
        if(decodedToken.username){
            next();
        }else{
            res.status(403).json({msg:"Invalid Authentication"});
    }
    }catch(e){
        res.json({
            err: "Incorrect Input"
        })
    }
    
}

module.exports = adminMiddleware;