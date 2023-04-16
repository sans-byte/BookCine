const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on("connected",()=>{
    console.log("DataBase has been connected successfully!");
})
mongoose.connection.on("error",(err)=>{
    console.log("DataBase Not Connected 🚫")
})