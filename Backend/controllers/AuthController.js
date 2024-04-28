const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const registerHandler = async(req,resp)=>{
      const {email,username,password} = req.body;
     try{
      if(!email || !username || !password)
      return resp.status(400).json({
    success:false,
    msg:"Please Fill All The Fields"})
    
    const user = await User.findOne({email});
    if(user){
        return resp.status(403).json({
            success:false,
            msg:"User Already Exists"
        })
    }
    let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10)
        }catch(err){
            console.log(err)
            return resp.status(500).json({
                success:false,
                msg:"Problem in hashing Password"
            })
        }
        const newuser = await User.create({
            email:email,
            username:username,
            password:hashedPassword
        })     
     const{password:userpassword, ...userdata}  = newuser._doc
    return resp.status(200).json({
        msg:"User Registered Successfully",
        success:true,
        userdata
    })

}catch(err){
    console.log(err)
        return resp.status(500).json({
            success:false,
            msg:"Problem While Registering User"
        })
    }
}




const loginHandler = async(req,resp)=>{

    try{
    const {email,password} = req.body;
    console.log(email+"<-->"+password)
    if(!email || !password){
        return resp.status(400).json({
            success:false,
            msg:"Please fill all the fields"
        })}

        const user = await User.findOne({email});
        console.log(user)
        if(!user){
            return resp.status(401).json({
                success:false,
                msg:"User do not exist"
            })
        }
        try{
                if(! await bcrypt.compare(password,user.password)){
                       return resp.status(400).json({
                        success:false,
                        msg:"Password do not match"
                       }) 
                }
        }catch(err){
            console.log(err)
    return resp.status(500).json({
        success:false,
        msg:"Problem while Verifying Password"
    })        
        }
      const payload = {
        id:user._id,
        email:user.email,
        isAdmin:user.isAdmin
      }  
        const token = await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2hr"})
        const options={expires: new Date(Date.now() + 2*60*60*1000),
                        httpOnly:true,}                       
            resp.cookie("web_token",token,options);
            const userdata = await user._doc
            return resp.status(200).json({
                msg:"User Login Successfully",
                success:true,
                token,
                userdata
            })
    }
catch(err){
    console.log(err)
    return resp.status(500).json({
        success:false,
        msg:"Problem while Login User"
    })
}
        
        

}



const logoutHandler = async(req,resp)=>{
          try {
    resp
      .clearCookie('web_token')
      .status(200)
      .json({success:true,msg:'User has been LogOut'});
  } catch (err) {
    return resp.status(500).json({msg:"Problem while logout user"})
  }

}

module.exports = {registerHandler,loginHandler,logoutHandler}