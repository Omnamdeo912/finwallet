// if you dont want to put load on your db you can use authentication apps like authy,or microsoft authehticator

// there are mutiple types of jwt tokes here we are gonna use Bearer

const { JWT_SECRET } =require('./config')
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        // yaha se hm userid pass kar rahe us route ko jo ye middleware use kar raha 
        // to pass data from middle ware to route we put data in req object
        req.userId = decoded.userId;

        next();
    }
    catch(err){
        return res.status(403).json({msg: "token not matched"});
    }

}

module.exports= {
    authMiddleware
}