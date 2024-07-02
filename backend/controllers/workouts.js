

const getAllWorkouts = (req, res) => {
  res.send('All Workouts')
}

const createWorkout = (req, res) => {
  res.send('Create Workout')
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