const mongoose = require("mongoose");
const { dbConnection } = require("./config/db");
const { books } = require("./data");
const {Books} = require("./models/Books")
require("dotenv").config();

// DataBase connection
dbConnection()

const importBooks =async ()=>{
    try {
        Books.insertMany(books)
        console.log("The data has Added")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const removeBooks =async ()=>{
    try {
        Books.deleteMany()
        console.log("The data has Deleted")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

// node seeder -import
if(process.argv[2] === "-import"){
    importBooks()
}

// node seeder -remove
else if(process.argv[2] === "-remove"){
    removeBooks()
}
