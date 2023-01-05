const mongoose = require("mongoose");
const joi = require("joi");
const { boolean, bool } = require("joi");

// User schema
const userSchema = mongoose.Schema({
    email: {
        required: true,
        type: String,
        trim:true,
        minlength:5,
        maxlength:100
    },
    Password: {
        required: true,
        type: String,
        trim:true,
        minlength:5,
        maxlength:100
    },
    Username: {
        required: true,
        type: String,
        trim:true,
        minlength:5,
        maxlength:100
    },
    isAdmin: {
        type: Boolean,
        deafult : false 
    }
},{timestamps: true})

// User model
const User = mongoose.model("User",userSchema)

// Register validate
const valditRegister =(obj)=>{
    const schema = joi.object({
        email: joi.string().trim().max(100).min(5).email().required(),
        Password: joi.string().trim().max(100).min(5).required(),
        Username: joi.string().trim().max(100).min(5).required(),
        isAdmin : joi.bool
    })
    return schema.validate(obj)
}

// Login validate
const valditLogin =(obj)=>{
    const schema = joi.object({
        email: joi.string().trim().max(100).min(15).email().required(),
        Password: joi.string().trim().max(100).min(5).required(),    
    })
    return schema.validate(obj)
}

// Update validate
const valditUpdate =(obj)=>{
    const schema = joi.object({
        email: joi.string().trim().max(100).min(1).email(),
        Password: joi.string().trim().max(5).min(100),
        Username: joi.string().trim().max(100).min(1),
        isAdmin : joi.bool
    })
    return schema.validate(obj)
}

module.exports= {User, valditLogin, valditRegister, valditUpdate}