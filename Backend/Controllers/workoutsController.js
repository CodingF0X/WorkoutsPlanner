const { json } = require('express')
const asyncHandler = require('express-async-handler')
const { default: mongoose } = require('mongoose')
const { castObject } = require('../Models/workoutsModel')
const workoutDB = require('../Models/workoutsModel')

//Get All Workouts
exports.gethomePage=asyncHandler(async(req,res)=>{
    const user_id = req.user.id
    const workouts = await workoutDB.find({user_id})
    res.status(200).json(workouts)
})

//Get Single Workout
exports.getSingleWorkout= async(req,res)=>{
    const id = req.params.id
  
    if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(500).json({error:'no such workout'})
    }

    const singleWorkout = await workoutDB.findById(id)
   
    if(!singleWorkout){
     return  res.status(500).json({error:'no such workout'})
    }

    res.status(200).json(singleWorkout)
   
}

//Create new Workout
exports.createWorkout=asyncHandler(async(req,res)=>{
    
    const {title,load,reps} = req.body
    const user_id = req.user._id
    
    const workout =await     workoutDB.findOne({title})


//////////////////////////
/// Error Handling ///

    // if(workout){
    //     res.status(500).json({error: 'this workout already exist'})
        
    // }

    // if(!workout && !title )
    // res.status(500).json({error:'please enter a title'})

    // if(!workout )
    // {
    //    if(!load){ 
    //      res.status(500).json({error:'please enter  load'})
    //     }
    // //    if(isNaN(load)){
    // //      res.status(500).json({error:'please enter valid load'})
    // //     }
    //    if(!isNaN(load))
    //    {
    //       if(!reps)
    //          res.status(500).json({error:'please enter  number of reps'})

    //     //   if(isNaN(reps))
    //     //      res.status(500).json({error:'please enter valid reps'})
    //    }

    // }

 ////////////////////////
      
    let emptyFields=[]

    if(!title){
    emptyFields.push('title')
   // res.status(500).json({error:'please enter  title'})
    }

    if(!load){
        emptyFields.push('load')
    //  return res.status(500).json({error:'please enter  load'})
               
    }

    if(!reps){
    emptyFields.push('reps')
    // return res.status(500).json({error:'please enter  reps'})
    }

    if(emptyFields.length >0){
        res.status(400).json({errorMessage:'please fill in all the fields', emptyFields})
    }
    
    
        const workoutCreated = await workoutDB.create({title,load,reps,user_id})
            res.status(200).json(workoutCreated)
    
    
       
    
  
})

//update an existing workout
exports.updateWorkout=asyncHandler(async(req,res)=>{
    const id = req.params.id
    const {title,reps,load} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'no such workout'})
    }
    
    const workout = await workoutDB.findById( id)
    
        if(!workout)
      return  res.status(500).json({error:'no such workout xx'})
            
        
            if(workout){
                const updatedWorkout = await workoutDB.findOneAndUpdate(workout,{
                   $set:req.body
                },{new:true})
        
                
                res.status(200).json(updatedWorkout)
            }
    
        
    
   
        res.status(400).json({message:'error'})
    
})

//Delete single workout 
exports.deleteWorkout=asyncHandler(async(req,res)=>{
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id))
       return res.status(404).json({message:'no such workout'})
       
    const workout = await workoutDB.findByIdAndDelete(id)
    // const workoutCheck = await workoutDB.findOne({_id:id})
    res.status(200).json(workout)

    !workout && res.status(500).json({error:'workout desnt exist' , message:'it might have benn moved or deleted'})

      workout && res.status(200).json({message:'workout has been deleted'})
    
    //  const deletedWorkout = await workoutDB.deleteOne(workout)
    //  res.status(200).json(deletedWorkout)
   
    
    
})