const Workout = require('../models/Workout')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllWorkouts = asyncWrapper(async (req, res) => {
  try {
    if (req.body.adminPasscode !== process.env.ADMIN_PASSCODE) {
      return next(createCustomError(`unauthorized: can not access route`, 403), req,res)
    }
  } catch (error) {
    return next(createCustomError(`unauthorized: can not access route`, 403), req,res)
  }
  const workouts = await Workout.find({})

  return res.status(200).json({ workouts })
})

const createWorkoutList = asyncWrapper(async (req, res) => {
  // const workout = await Workout.create(req.body)
  // res.status(201).json({ workout })
  return next(createCustomError(`route does not exist`, 404), req,res)
})

const getWorkouts = asyncWrapper(async (req, res, next) => {
  const workout = await Workout.findOne({ userId: req.params.id })

  if (!workout) {
    return next(createCustomError(`No workouts for user with id : ${req.params.id}`, 404), req,res)
  }

  res.status(200).json({ workout })
})

const updateWorkout = asyncWrapper(async (req, res, next) => {
  const newWorkout = req.body.workout
  const workoutIndex = parseInt(req.body.workoutIndex)

  let workoutsData = await Workout.findOne({ userId: req.params.id }).lean()

  if (!workoutsData) {
    return next(createCustomError(`No workoutList with id : ${req.params.id}`, 404))
  }

  workoutsData.workouts[workoutIndex] = newWorkout

  let newWorkoutData;
  try {
    newWorkoutData = await Workout.findOneAndUpdate(
      { userId: req.params.id },
      { $set: { workouts: workoutsData.workouts }},
      { new: true,
        runValidators: true 
      })
  } catch (error) {
    return next(createCustomError(`Update Error : ${error}`, 404))
  }
    
  res.status(200).json({ newWorkoutData })
})

const deleteWorkout = asyncWrapper(async (req, res, next) => {
  const { userId } = req.body

  const workoutList = await Workout.findOne({ userId })

  if (!workoutList) {
    return next(createCustomError(`No workouts for user with id : ${userId}`, 404))
  }

  const workoutCount = workoutList.workouts.length

  const workouts = workoutList.workouts.filter((workout) => workout._id.toString() !== req.params.id)

  // verifies a workout was deleted
  if (workoutCount === workouts.length) {
    return next(createCustomError(`No workout with id : ${req.params.id}`, 404))
  }

  const newWorkoutList = await Workout.findOneAndUpdate(
    { userId: userId },
    { workouts },
    { new: true,
        runValidators: true })

  res.status(200).json({ newWorkoutList })
})

  // const workout = await Workout.findOneAndUpdate(
  //   {_id: req.params.id},
  //   req.body,
  //   { new: true,
  //   runValidators: true })

const addWorkout = asyncWrapper(async (req, res, next) => {
  const user = await Workout.findOne({ userId: req.params.id })
  
  if (!user) {
    return next(createCustomError(`No user with id : ${req.params.id}`, 404))
  }

  const { workouts } = user
  workouts.unshift(req.body)

  let userWorkouts;
  
  try {
    userWorkouts = await Workout.findOneAndUpdate(
      {userId: req.params.id},
      { workouts },
      { new: true,
      runValidators: true })
  } catch (error) {
    return res.status(400).json({ err: error.message })
  }

  if (!userWorkouts) {
    return next(createCustomError(`No userWorkouts with id : ${req.params.id}`, 404))
  }

  res.status(200).json({ userWorkouts })

})

module.exports = {
  getAllWorkouts,
  createWorkoutList,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
  addWorkout,
}