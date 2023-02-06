const asyncHandler = require('express-async-handler')
const userDB = require('../Models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id)=>{
  return  jwt.sign({_id},process.env.SECRET,{expiresIn: '1h'})
}


//signup new user
exports.signupUser= asyncHandler(async (req,res)=>{
    const {email, password} = req.body

     
    // let emptyFields = []

    //  if(!email){
    //     emptyFields.push('email')
    //     // res.status(400).json({errorMessage: 'please enter email'})
    //  }

    //  if(!password){
    //     emptyFields.push('password')
    //     // res.status(400).json({errorMessage:'please enter password'})
    //  }

    //  if(emptyFields.length >0) {
    //     res.status(400).json({error: 'please fill in all fields', emptyFields})

    //  }

    try{

    

        

        const user = await userDB.signup(email,password)


        const token = createToken(user._id)
    
        res.status(200).json({email,token})

    }catch(error){
        
        res.status(400).json({error : error.message})
    }

    if(!user){
        res.status(400).json({error : 'registration failed'})
    }
})

//login user
exports.loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body

    try{
        const user = await userDB.login(email,password)
        const token = createToken(user._id)

        res.status(200).json({email,token})


    }catch(error){
        res.status(400).json({error:error.message})
    }

})