const Workout = require('../models/Workout')
const asyncWrapper = require('../middleware/async')
const { createCustomError, CustomAPIError } = require('../errors/custom-error')

const getAllWorkouts = asyncWrapper(async (req, res) => {
  const workouts = await Workout.find({})
  res.status(200).json({ workouts })
})

const createWorkout = asyncWrapper(async (req, res) => {
  const workout = await Workout.create(req.body)
  res.status(201).json({ workout })
})

const getWorkout = asyncWrapper(async (req, res, next) => {
  const workout = await Workout.findById(req.params.id)

  if (!workout) {
    return next(createCustomError(`No task with id : ${req.params.id}`, 404), req,res)
  }

  res.status(200).json({ workout })
})

const updateWorkout = asyncWrapper(async (req, res, next) => {
  const workout = await Workout.findOneAndUpdate(
    {_id: req.params.id},
    req.body,
    { new: true,
    runValidators: true })

  if (!workout) {
    return next(createCustomError(`No task with id : ${req.params.id}`, 404))
  }
    
  res.status(200).json({ workout })
})

const deleteWorkout = asyncWrapper(async (req, res, next) => {
  const workout = await Workout.findByIdAndDelete(req.params.id)

  if (!workout) {
    return next(createCustomError(`No task with id : ${req.params.id}`, 404))
  }

  res.status(200).json({ workout })
})

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
}