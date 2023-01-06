const express = require("express");
const asyncHand = require("express-async-handler")
const {valditUpdate, User} = require("../models/User")
const router = express.Router();
const bcrypt = require("bcryptjs")
const {tokenVandcheck} = require("../middlewares/TokenVerfiy")


/**
 * @desc Update user info
 * @route /api/user
 * @method PUT
 * @access private
 */



router.put("/:id", tokenVandcheck ,asyncHand (async(req,res)=>{

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


/**
 * @desc Get All Users
 * @route /api/user
 * @method GET
 * @access public
 */

router.get("/",  asyncHand (async(req,res)=>{
    
    const user = await User.find().select("-Password")

    res.status(200).json(user)

}))


/**
 * @desc Get User by Id
 * @route /api/user:id
 * @method GET
 * @access public
 */


router.get("/:id", asyncHand(async(req,res)=>{
    
    const user = await User.findById(req.params.id).select("-Password");
    if(user){
    res.status(200).json(user)}
    else{
        res.status(200).json({message:"User not found"})}
    }
))

/** 
* @desc Delete User
* @route /api/user/:id
* @method Delete
* @access public
*/


router.delete("/:id", asyncHand(async(req,res)=>{

   const user = await User.findByIdAndDelete(req.params.id)

   if(user){
    res.status(200).json({message:"User has Deleted"})}
    else{
        res.status(200).json({message:"User not found"})}
    }
))



module.exports = router;