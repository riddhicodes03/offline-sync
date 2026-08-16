const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');
function SetUser(user){
    return jwt.user({
        id:user._id,
        email:user.name,
    },secret);
}
function GetUser(token){
    return jwt.verify(token,secret);
}
module.exports={
    GetUser,SetUser
}