import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    //get token from authorization header
    const authHeader = req.header["authorization"];

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message: "Authorization denied no token provided"});
    }

    const token = authHeader.split(" ")[1]; //"Bearer abc123".split(" ") → ["Bearer", "abc123"]-> [1] -> "abc123"
    if(!token) return res.status(401).json({message: "No token, authorization denied"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //{ id: userId };
        next();
    }catch(err){
        res.status(401).json({message: "Token is not valid"});
    }
}

export default authMiddleware;