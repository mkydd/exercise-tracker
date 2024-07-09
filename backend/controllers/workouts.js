const Workout = require('../models/Workout')

const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({})
  res.status(200).json({ workouts })
}

const createWorkout = async (req, res) => {
  const workout = await Workout.create(req.body)
  res.json({ workout })
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

const deleteWorkout = (req, res) => {
  res.send(`Delete Workout (id: ${req.params.id})`)
}

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkout,
  updateWorkout,
  deleteWorkout,
}