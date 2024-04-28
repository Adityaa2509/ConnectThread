const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const connectDb = require('./config/database')
require('dotenv').config();
const PORT = process.env.PORT || 4000
const authRouter = require('./routes/AuthRoutes')
const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouter)


app.get('/',(req,resp)=>{
    return resp.status(200).json({
        msg:"EveryThing is working Fine"
    })
})




connectDb();
app.listen(PORT,()=>{
        console.log(`App is running at ${PORT}`);
})