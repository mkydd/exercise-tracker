const Workout = require('../models/Workout')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllWorkouts = asyncWrapper(async (req, res) => {
  const workouts = await Workout.find({})
  res.status(200).json({ workouts })
})

const createWorkout = asyncWrapper(async (req, res) => {
  const workout = await Workout.create(req.body)
  res.status(201).json({ workout })
})

const getWorkout = asyncWrapper(async (req, res, next) => {
  const workout = await Workout.findOne({ userId: req.params.id })

  if (!workout) {
    return next(createCustomError(`No workout with id : ${req.params.id}`, 404), req,res)
  }

  res.status(200).json({ workout })
})

const updateWorkout = asyncWrapper(async (req, res, next) => {
  // const workout = await Workout.findOneAndUpdate(
  //   {_id: req.params.id},
  //   req.body,
  //   { new: true,
  //   runValidators: true })

  const workout = await Workout.findOne({ userId: req.params.id })

  if (!workout) {
    return next(createCustomError(`No workout with id : ${req.params.id}`, 404))
  }
    
  res.status(200).json({ workout })
})

const deleteWorkout = asyncWrapper(async (req, res, next) => {
  const workout = await Workout.findByIdAndDelete({ _id: req.params.id })

  if (!workout) {
    return next(createCustomError(`No workout with id : ${req.params.id}`, 404))
  }

  res.status(200).json({ workout })
})

const addWorkout = asyncWrapper(async (req, res, next) => {
  const user = await Workout.findOne({ userId: req.params.id })
  
  if (!user) {
    return next(createCustomError(`No user with id : ${req.params.id}`, 404))
  }

  const { workouts } = user
  workouts.push(req.body)

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
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
  addWorkout,
}