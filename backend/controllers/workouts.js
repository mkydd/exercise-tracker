const Workout = require('../models/Workout')

const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({})
  res.status(200).json({ workouts })
}

const createWorkout = async (req, res) => {
  const workout = await Workout.create(req.body)
  res.json({ workout })
}

const getWorkout = (req, res) => {
  res.send(`Get Individual Workout (id: ${req.params.id})`)
}

const updateWorkout = (req, res) => {
  res.send(`Update Workout (id: ${req.params.id})`)
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