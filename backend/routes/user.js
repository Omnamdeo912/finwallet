const express = require('express')
const { User,Account } = require('../db')
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require('../middleware')

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

    const { success } = signupBody.safeParse(req.body)   //safeParse return an object , { success } is object desturcturing or we can do it like const obj = signupbody.safeParse(req.body) ...\n ... if(obj.success){}
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

    // Creating user account on signup

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })

}) 

// rightnow the password is stored in plain test , we need to encrypt the password -> we can use bcrypt to do so.

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

const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()

})
router.put('/', authMiddleware , async (req,res) => {
    const { success } = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({msg:"Error while updating info"});
    }

    await User.updateOne({
        _id: req.userId
    },
    { $set: req.body } 
    )
    console.log(req.userId);
    res.json({
        msg: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = router;