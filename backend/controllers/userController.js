import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'  
import bcrypt from 'bcrypt'  // to make password hased
import validator from 'validator'  // to check email and password validation

// login here

const loginUser = async (req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await userModel.findOne({email})
    if(!user){
      res.json({success:false,message:'User Does not exist'})
    }
    const isMatch = await bcrypt.compare(password,user.password);

   if(!isMatch){
       res.json({success:false,message:'Invalid Password'})
   }

   const token = createToken(user._id)
    res.json({success:true,token})

  } catch (error) {
    console.log(error);
     res.json({success:false,error})
    
  }
};

// Create Token function

const createToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

//register user

const registerUser = async (req,res)=>{
   const {name,password,email} = req.body;
  // checking user alreay exist
   try {
      const exist = await userModel.findOne({email})
      if(exist){
        return res.json({success:false,message:'user already exist'})
      }

  // validation email format and strong password
      if(!validator.isEmail(email)){
        return res.json({success:false,message:'Please enter valid email'})
      }

  // strong password
    if(password.length<8){
       return res.json({success:false,message:'Please enter Strong password'})
    }    

  // hasing userpassword

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

  // All Check

    const newUser = new userModel({
      name:name,
      email:email,
      password:hashedPassword,
    })

  // To save user in database  

    const user = await newUser.save();
    const token = createToken(user._id)
    res.json({success:true,token})
   } catch (error) {
     console.log(error);
     res.json({success:false,error})
   }
};

export {loginUser,registerUser}



