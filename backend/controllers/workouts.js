const Workout = require('../models/Workout')

const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({})
  res.status(200).json({ workouts })
}

const createWorkout = async (req, res) => {
  const workout = await Workout.create(req.body)
  res.status(201).json({ workout })
}

const getWorkout = async (req, res) => {
  const workout = await Workout.findById(req.params.id)
  res.status(200).json({ workout })
}

const updateWorkout = async (req, res) => {
  const workout = await Workout.findOneAndUpdate(
    {_id: req.params.id},
    req.body,
    { new: true,
    runValidators: true })

  res.status(200).json({ workout })
}

const deleteWorkout = async (req, res) => {
  const workout = await Workout.findByIdAndDelete(req.params.id)
  res.status(200).json({ workout })
}

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
}