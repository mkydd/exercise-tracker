const Workout = require('../models/Workout')
const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const { createCustomError, CustomAPIError } = require('../errors/custom-error')

const getAllWorkouts = asyncWrapper(async (req, res, next) => {
  try {
    if (req.body.adminPasscode !== process.env.ADMIN_PASSCODE) {
      return next(createCustomError(`unauthorized: can not access route`, 403), req, res)
    }
  } catch (error) {
    return next(createCustomError(`unauthorized: can not access route`, 403), req, res)
  }
  const workouts = await Workout.find({})

  return res.status(200).json({ workouts })
})

const getWorkouts = asyncWrapper(async (req, res, next) => {
  const userTokenId = req.auth.payload.sub;

  const workout = await Workout.findOne({ userId: req.params.id })
  const user = await User.findOne({ _id: req.params.id})

  if (!workout || userTokenId != user.auth0Id) {
    return next(createCustomError(`No workouts for user with id : ${req.params.id}`, 404), req, res)
  }

  res.status(200).json({ workout })
})

const updateWorkout = asyncWrapper(async (req, res, next) => {
  const userTokenId = req.auth.payload.sub;

  const newWorkout = req.body.workout
  const workoutIndex = parseInt(req.body.workoutIndex)

  let workoutsData = await Workout.findOne({ userId: req.params.id }).lean()
  const user = await User.findOne({ _id: req.params.id})

  if (!workoutsData || userTokenId !== user.auth0Id) {
    return next(createCustomError(`No workoutList with id : ${req.params.id}`, 404), req, res)
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
    return next(createCustomError(`Update Error : ${error}`, 404), req, res)
  }
    
  res.status(200).json({ newWorkoutData })
})

const deleteWorkout = asyncWrapper(async (req, res, next) => {
  const userTokenId = req.auth.payload.sub;
  const { userId } = req.body

  const workoutList = await Workout.findOne({ userId })
  const user = await User.findOne({ _id: userId })

  if (!workoutList || userTokenId !== user.auth0Id) {
    return next(createCustomError(`No workouts for user with id : ${userId}`, 404), req, res)
  }

  const workoutCount = workoutList.workouts.length

  const workouts = workoutList.workouts.filter((workout) => workout.id !== req.params.id)

  // verifies a workout was deleted
  if (workoutCount === workouts.length) {
    return next(createCustomError(`No workout with id : ${req.params.id}`, 404), req, res)
  }

  const newWorkoutList = await Workout.findOneAndUpdate(
    { userId: userId },
    { workouts },
    { new: true,
        runValidators: true })

  res.status(200).json({ newWorkoutList })
})

const addWorkout = asyncWrapper(async (req, res, next) => {
  const userTokenId = req.auth.payload.sub;

  const userWorkoutData = await Workout.findOne({ userId: req.params.id })
  const user = await User.findOne({ _id: req.params.id})

  if (!userWorkoutData || userTokenId != user.auth0Id) {
    return next(createCustomError(`No user with id : ${req.params.id}`, 404), req, res)
  }

  const { workouts } = userWorkoutData
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
    return next(createCustomError(`No userWorkouts with id : ${req.params.id}`, 404), req, res)
  }

  res.status(200).json({ userWorkouts })

})

module.exports = {
  getAllWorkouts,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
  addWorkout,
}