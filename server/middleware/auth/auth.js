const jwt = require('jsonwebtoken');
const config  = require('config');

module.exports = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    if(!token) return res.status(401).send("Access Denied, No Token Provided");

    try{
        const decoded = jwt.verify(token, config.get('secret_key'));
        req.user = decoded;
        next();
    }
    catch(e){
        res.status(400).send('Invalid Token');
    }
}