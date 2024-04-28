const mongoose = require('mongoose')

const connectDb = async()=>{
    try{
      const db = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`DataBase Connected Successfully at ${process.env.MONGODB_URI}`)
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDb;