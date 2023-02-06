const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')



const schema = mongoose.Schema

const userSchema = new schema({
    // username:{
    //     type:String,
    //     required:[true,'please enter username'],
    //     unique:true,
    // },
    email:{
        type:String,
        required:[true,'please enter email'],
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})


userSchema.statics.signup = async function(email , password) {
    if(!email || !password)
        throw Error('all fields must be filled')  

    if(!validator.isEmail(email))
        throw Error('invalid email address')
    
    if(!validator.isStrongPassword(password))
        throw Error('password isn`t strong enough')

        
    const exists = await this.findOne({email})
    if(exists){
        throw Error('email already in use')
    }

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email,password:hash})

    return user

}

/////// OR ////////

// userSchema.pre('save',async function(next){

//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password , salt);
//     next()
// })


userSchema.statics.login = async function (email,password){
    
    if(!email || !password)
    throw Error ('all filleds must be filled')

    const user = await this.findOne({email})

    if(!user)
      throw Error ('no such user with this email')

    const auth = await bcrypt.compare(password,user.password)

    if(!auth)
        throw Error ('incorrect password')

    if(auth)
    return user
}



const user = mongoose.model('User',userSchema)

module.exports = user