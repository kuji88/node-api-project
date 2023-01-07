const mongoose = require("mongoose");


const dbConnection = async()=>{
    try {
       await mongoose.set('strictQuery', false)
        mongoose.connect(process.env.mongodb_URL)
        .then(()=>console.log("connection done"))
        .catch((err)=> console.log("connection lost",err))
    } catch (error) {
        console.log({error})
    }
}

module.exports={dbConnection};