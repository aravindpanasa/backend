const jwt = require('jsonwebtoken');
const user = require('../models/userModel');
//const asyncHandler = require('asyncHandler');

const auth = async (req, res, next) => {

    var token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try {
            token = req.headers.authorization.split(" ")[1];
            
           // console.log(token);

            const decoded = jwt.verify(token, process.env.SECRET);
            console.log(decoded);

            req.user = await user.findOne({ _id: decoded.id }).select("-password");   //Gives all the fields of user except password

         //   console.log("Auth Success "+req.user);

        }
        catch(err) {
            console.log("Auth Failed "+err);
        }

        next();
    }
    else {
        console.log("No in bearer"+req.headers);
    }

}

module.exports = { auth }
