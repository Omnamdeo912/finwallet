const express = require('express');
const router = express.Router();
const userRouter  = require('./user');
// const { User } = require('../db')

router.use('/user',userRouter);

// router.post('/signup', async (req,res) => {
//     const username = req.body.username;
//     const password =  req.body.password;
//     const firstname = req.body.firstname;
//     const lastname = req.body.lastname;

//     const user_created = await User.create({
//         username,
//         password,
//         firstname,
//         lastname
//     })
//     .then(()=>{
//         res.json({msg:"User ceated successfully"})
//     })
//     .catch((err)=>{
//         res.json({msg:"ERROR occured"})
//     })

// }) 


module.exports = router;