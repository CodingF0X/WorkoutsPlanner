const jwt = require('jsonwebtoken')
const USER = require('../Models/userModel')


const requireAuth =  async (req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization){
        return res.status(400).json({error:'authorization token required'})
    }

                  // this part is the token
    /// bearer asdjnaslnflasnfasfasf.lajsfhklashfklaafasfaf.klasfklashfklahfaf

    // so we split that string :

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token,process.env.SECRET)
        req.user = await USER.findOne({_id}).select('_id')
        next()
    }
    catch(error){
        console.log(error)
        res.status(400).json({error:'request is not authorized'})
    }


  

}

module.exports = requireAuth