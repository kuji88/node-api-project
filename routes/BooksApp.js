const express = require("express");
const { default: mongoose } = require("mongoose");
const {getallBooks,getbyID, addBook,updateBooks,deleteBooks} = require("../Controllers/booksController")



const router = express.Router();



/**
 * @desc get all books
 * @route /api/books:id
 * @method Get
 * @access public
 */
router.get("/",getallBooks)



/**
 * @desc get books by id
 * @route /api/books:id
 * @method Get
 * @access public
 */
router.get("/:id",getbyID)


/**
 * @desc  Add Books
 * @route /api/books
 * @method Post
 * @access public
 */
router.post("/",addBook )

/**
 * @desc  Update Book
 * @route /api/books
 * @method PUT
 * @access public
 */
router.put("/:id", updateBooks)

/**
 * @desc  Delete Books
 * @route /:id
 * @method Delete
 * @access public
 */

router.delete("/:id",deleteBooks)




module.exports = router;
