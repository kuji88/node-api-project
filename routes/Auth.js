const express = require("express");
const { default: mongoose } = require("mongoose");
const asyncHand = require("express-async-handler")
const {User, valditLogin, valditRegister} = require("../models/User")
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


/**
 * @desc Register
 * @route /api/Auth
 * @method POST
 * @access public
 */

router.post("/register",async (req,res)=>{
    try{
    const {error} = valditRegister(req.body)
    if(error){
        return res.status(404).json(error.details[0].message)
    }

    let user = await User.findOne({email: req.body.email});

    if(user){
        return res.status(404).json("Email already Registered")
    }

    const salt = await bcrypt.genSalt(10);
    req.body.Password = await bcrypt.hash(req.body.Password,salt)

    user = new User({
        email: req.body.email,
        Password: req.body.Password,
        Username: req.body.Username,
        isAdmin : req.body.isAdmin
    })

    const result = await user.save();
    res.status(200).json(result)
}catch(error){
console.log(error,"the error is")

}
})

/**
 * @desc Login
 * @route /api/Auth
 * @method POST
 * @access public
 */

router.post("/login",async (req,res)=>{
    try{
    const {error} = valditLogin(req.body)
    if(error){
        return res.status(404).json(error.details[0].message)
    }

    let user = await User.findOne({email: req.body.email});

    if(!user){
        return res.status(404).json({message:"Email or Password is wrong"})
    }

    const log = await bcrypt.compare(req.body.Password,user.Password)

    if(!log){
        return res.status(404).json({message:"Email or Password is wrong"})
    }

    const token = jwt.sign({id: user.id, Username: user.Username, email: user.email},process.env.jwtsecret)
    const pass= {...user._doc,token}

    res.status(200).json(pass)
}catch(error){
console.log(error,"the error is")

}
})



module.exports = router;
