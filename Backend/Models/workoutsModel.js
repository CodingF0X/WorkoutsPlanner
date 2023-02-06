const mongoose = require('mongoose')
const schema = mongoose.Schema

const workoutSchema = new schema({
    title:{
        type:String,
        required:true,

    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},{timestamps:true})

const workout = mongoose.model('workout',workoutSchema)

module.exports = workout