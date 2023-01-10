const express = require("express");
const asyncHand = require("express-async-handler")
const {Books, valditCreateBooks, valditUpdateBooks} = require("../models/Books")




/**
 * @desc get all books
 * @route /api/books:id
 * @method Get
 * @access public
 */
 const getallBooks = asyncHand(async(req,res)=>{
    
    const {minRate, maxRate}= req.query
    let books;

    if(minRate && maxRate){
        books = await Books.find({rating: {$gte: minRate, $lte : maxRate}});
    }
    else{
        books = await Books.find();
    }



    res.status(200).json(books)

})

/**
 * @desc get books by id
 * @route /api/books:id
 * @method Get
 * @access public
 */
const getbyID =async(req,res)=>{
    const book= await Books.findById(req.params.id)
    if(book){
        res.status(200).json(book)
    }
    else{res.status(404).json("message:not found") }
}


/**
 * @desc  Add Books
 * @route /api/books
 * @method Post
 * @access public
 */
const addBook= async(req,res)=>{

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

}


/**
 * @desc  Update Books
 * @route /api/books
 * @method PUT
 * @access public
 */
const updateBooks = async(req,res)=>{
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
}


/**
 * @desc  Delete Books
 * @route /:id
 * @method Delete
 * @access public
 */
const deleteBooks =async(req,res)=>{
    
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


module.exports={
    getallBooks,getbyID,addBook,updateBooks,deleteBooks
}