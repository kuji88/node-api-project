const express = require("express")
const bookPath = require("./routes/BooksApp")
const auth = require("./routes/Auth")
const users = require("./routes/Users")
const {dbConnection} = require("./config/db")
require("dotenv").config()


// mongodb coonection
dbConnection()

const app = express();

app.use(express.json())

//routes
app.use("/api/books",bookPath)
app.use("/api/auth", auth)
app.use("/api/users", users)



const PORT= 4000;
app.listen(PORT,()=> console.log(`The server will run on http://localhost:${process.env.PORT}`))