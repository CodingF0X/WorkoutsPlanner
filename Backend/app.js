const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
// const {errorHandler} = require('./middleWare/errorHandler')


const workoutsRouter = require('./Routes/workouts')
const usersRouter=require('./Routes/users')



dotenv.config()
app.use(express.json())


app.listen(process.env.URL, 
 mongoose.connect('mongodb://localhost:27017/workouts'),()=>{
 console.log('connected to db') 
 console.log('server is up and running')
})


app.use('/api/workouts',workoutsRouter)
app.use('/api/users',usersRouter)

// app.use(errorHandler)