const dotenv = require("dotenv");
dotenv.config({ origin: "*", path: "./.env" });
const jwt = require("jsonwebtoken");
async function generateToken(user){
    const payload = {
        _id:user._id,
        username:user.username,
        email:user.email
    }
    const token = jwt.sign(payload,process.env.SECRET_KEY,{
        expiresIn:"1d"
    })
    return token;
}

async function verifyToken(token){
    const payload = jwt.verify(token,process.env.SECRET_KEY);
    return payload;
}

module.exports = {generateToken,verifyToken};
