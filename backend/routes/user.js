const express = require('express')
const { User } = require('../db')
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const signupBody = zod.object({
    username: zod.string(),
	firstname: zod.string(),
	lastname: zod.string(),
	password: zod.string()
})

router.post('/signup', async (req,res) => {
    const username = req.body.username;
    const password =  req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user_created = await User.create({
        username,
        password,
        firstname,
        lastname
    })

    const userId = user_created._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })

}) 

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post('/signin', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const { success }  = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({msg:"Incorrect inputs"});
    }

    const user_exist = await User.findOne({
        username: username,
        password: password
    })

    if(!user_exist){
        return res.status(411).json({
            msg:"Error while logging in"
        })
    }
    else{
        const userId = user_exist._id;
        const token = jwt.sign({
            userId
        },JWT_SECRET);
        res.status(200).json({token:token});
    }
})


module.exports = router;