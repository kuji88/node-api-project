const express = require("express");
const asyncHand = require("express-async-handler")
const {valditUpdate, User} = require("../models/User")
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


/**
 * @desc Update user info
 * @route /api/user
 * @method PUT
 * @access private
 */

router.put("/:id",asyncHand (async(req,res)=>{
    const {error}= valditUpdate(req.body)
    if(error){
        return res.status(404).json({message: error.details[0].message})
    }
    console.log(req.headers)

    if(req.body.Password){
         const salt = await bcrypt.genSalt(10);
         req.body.Password = await bcrypt.hash(req.body.Password,salt)
    }

    const user = await User.findByIdAndUpdate(req.params.id,{
        $set: {
            email: req.body.email,
            Password: req.body.Password,
            Username: req.body.Username
        }
    },{new: true}).select("-Password")

    res.status(200).json(user)

}))


module.exports = router;