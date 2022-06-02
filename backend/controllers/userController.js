const user = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateTokens');
//const res = require('express/lib/response');

const registerUser = async (req, res) => {     //ivrMessageForTimeOffBalance
    
    console.log("In register user");
    
    const { name, email, password, pic } = req.body;

  //  console.log("In reg user controller");

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the fileds");
    }

    const userExists = user.findOne({ email });
    if (userExists) {
        res.status(400);
     //   throw new Error("User already exists");
    }

    const createUser = user.create({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
      //  pic
    }).then((data) => {
        if (data) {
           res.status(201).json({
            "id" : data._id,
            "name" : data.name,
            "email" : data.email,
            "password": data.password,
            "pic": createUser.pic,
            "token": generateToken(createUser._id)
            
        })
        }
        else {
            res.status(400);
            console.log("Failer to create user");
        }
    });

/*    if (createUser) {             To make use of this if make use if await  i.e await user.create aftre thet remove then((data)=>{.....})
        res.status(201).json({
            "id" : createUser._id,
            "name" : createUser.name,
            "email" : createUser.email,
            "password": createUser.password,
            "pic": createUser.pic,
            "token": generateToken(createUser._id)
            
        })
        res.send(createUser);
        console.log("user created successfully "+createUser);
    }*/
  /*  else {
        res.status(400);
        throw new Error("Failed to create user");
    }*/
}


const authUser = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var userData = await user.findOne({ email });
    if (userData && (await userData.matchPassword(password))) {
        res.json({
             "id" : userData._id,
            "name" : userData.name,
            "email" : userData.email,
            "password": userData.password,
            "pic": userData.pic,
            "token": generateToken(userData._id)
        })
    }
    else {

        res.status(401);
       //throw new Error("Invalid Email or Password");
        console.log("Invalid user");
    }
}

const allUsers = async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    } : {};

    const usersData = await user.find(keyword).find({ _id: { $ne: req.user._id } });
  //  console.log(req.user);

    res.send(usersData);
}

module.exports = { registerUser, authUser, allUsers };