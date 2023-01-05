const express = require("express")
const bookPath = require("./routes/BooksApp")
const auth = require("./routes/Auth")
const users = require("./routes/Users")
const logger = require("./middlewares/logger")
const {errorHandle, errorURL} = require("./middlewares/errorHandler")
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

// mongodb coonection
mongoose.set('strictQuery', false)
mongoose.connect(process.env.mongodb_URL)
.then(()=>console.log("connection done"))
.catch((err)=> console.log("connection lost",err))

const app = express();

app.use(express.json())

//routes
app.use("/api/books",bookPath)
app.use("/api/auth", auth)
app.use("/api/users", users)



const PORT= 4000;
app.listen(PORT,()=> console.log(`The server will run on http://localhost:${process.env.PORT}`))