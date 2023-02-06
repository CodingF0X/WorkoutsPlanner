const express = require('express')
const router = express.Router()
const workoutsController = require('../Controllers/workoutsController')
const requireAuth = require('../middleWare/requireAuth')


router.use(requireAuth)

//Get ALL workouts(Home Page)
router.get('/',workoutsController.gethomePage)

//Get singe workout
router.get('/:id',workoutsController.getSingleWorkout)


//Create Workout
router.post('/',workoutsController.createWorkout)

//Update workout
router.patch('/:id',workoutsController.updateWorkout)

//Delete workout
router.delete('/:id',workoutsController.deleteWorkout)


module.exports = router