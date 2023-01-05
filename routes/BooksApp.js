const express = require("express");
const Joi = require('joi');
const { default: mongoose } = require("mongoose");
const {Books, valditCreateBooks, valditUpdateBooks} = require("../models/Books")

const router = express.Router();



/**
 * @desc get all books
 * @route /api/books:id
 * @method Get
 * @access public
 */
router.get("/",async(req,res)=>{
    
    try{
    const books = await Books.find();
    res.status(200).json(books)
}
catch(error){
    console.log(error,"There's error")
}

})



/**
 * @desc get books by id
 * @route /api/books:id
 * @method Get
 * @access public
 */
router.get("/:id",async(req,res)=>{
    const book= await Books.findById(req.params.id)
    if(book){
        res.status(200).json(book)
    }
    else{res.status(404).json("message:not found") }
})


/**
 * @desc  Add Books
 * @route /api/books
 * @method Post
 * @access public
 */
router.post("/", async(req,res)=>{

    const {error} = valditCreateBooks(req.body)
    
    if(error){
        return res.status(400).json(error.details[0].message)
    }
    
    try{
        const book = new Books({
            
            name: req.body.name,
            rating: req.body.rating,
            description: req.body.description
        })
        const result =await book.save();
        res.status(201).json(result)
    }
    catch (error){
        console.log(error + "error")
        res.status(500).json({message: "something went wrong"})
    }

})

/**
 * @desc  Add Books
 * @route /api/books
 * @method PUT
 * @access public
 */
router.put("/:id", async(req,res)=>{
    const {error}= valditUpdateBooks(req.body)

    if(error){
        res.status(400).json(error.details[0].message)
    }

        try{
    const books = await Books.findByIdAndUpdate(req.params.id,{
        $set: {
        name: req.body.name,
        rating: req.body.rating,
        description: req.body.description,
        Password: req.body.Password
            }

    },{new: true})
    res.status(200).json(books)
}
catch(error){
    console.log(error,"error in '112' ")
}
})

/**
 * @desc  Delete Books
 * @route /:id
 * @method Delete
 * @access public
 */

router.delete("/:id", async(req,res)=>{
    
    try{
        const book= await Books.findById(req.params.id)

        if(book){
        await Books.findByIdAndDelete(req.params.id)
        res.status(200).json("message: The data has been deleted")
    }
    }catch(error){
        res.status(404).json("message: not found",error)
    }

}
)




module.exports = router;
