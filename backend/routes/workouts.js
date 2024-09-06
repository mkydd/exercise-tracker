const express = require('express');
const router = express.Router();

const { getAllWorkouts, createWorkoutList, getWorkouts, updateWorkout, deleteWorkout, addWorkout } = require('../controllers/workouts')

router.route('/').get(getAllWorkouts).post(createWorkoutList)
router.route('/:id').get(getWorkouts).post(addWorkout).put(updateWorkout).delete(deleteWorkout)

module.exports = router;