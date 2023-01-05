const mongoose = require("mongoose");
const Joi = require('joi');

const booksSchema= mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true,
        minlength:3,
        maxlength:200
    }
    ,
    rating:{
        type: Number,
        required: true,
        trim:true,
        minlength:3,
        maxlength:200
    }
    ,
    description: {
        type: String,
        required: true,
        trim:true,
        minlength:3,
        maxlength:300
    }
},{
    timestamps:true
})

const Books = mongoose.model("Book",booksSchema)

const valditCreateBooks=(obj)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        rating: Joi.number().min(5).max(30).required(),
        description: Joi.string().min(6).max(500).required(),
        
    })

    return schema.validate(obj);
}

const valditUpdateBooks=(obj)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(30),
        rating: Joi.number().min(5).max(30),
        description: Joi.string().min(6).max(500),
        
    })

    return schema.validate(obj);
}

module.exports={
    Books,
    valditCreateBooks,
    valditUpdateBooks
}