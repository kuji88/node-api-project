const express = require("express")
const bookPath = require("./routes/BooksApp")
const auth = require("./routes/Auth")
const users = require("./routes/Users")
const {dbConnection} = require("./config/db")
require("dotenv").config()
const helmet = require("helmet")
const cors = require("cors")

// mongodb coonection
dbConnection()

const app = express();

app.use(express.json())

// use Helmet
app.use(helmet());

//Use Cors
app.use(cors())

//routes
app.use("/api/books",bookPath)
app.use("/api/auth", auth)
app.use("/api/users", users)



const PORT= 4000;
app.listen(PORT,()=> console.log(`The server will run on http://localhost:${process.env.PORT}`))