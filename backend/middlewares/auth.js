const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try{
        const token = req.header("x-auth-token");
        if(!token){
            return res.status(401)
                .json({message: "No authentication token, authorization failed."});
        }

        //jwt.verify() verifies the token with the secret and returns the decrypted value.
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){
            return res.status(401)
            .json({message: "Token verification failed, authorization failed."});
        }

        req.user = verified.id;
        next();

    } catch(err) {
        res.status(500).json({message: "Server error",error: err.message});
    }
};

module.exports = auth;