const express = require('express');
const router = express.Router();

const { getAllWorkouts, createWorkout, getWorkout, updateWorkout, deleteWorkout, addWorkout } = require('../controllers/workouts')

router.route('/').get(getAllWorkouts).post(createWorkout)
router.route('/:id').get(getWorkout).post(addWorkout).patch(updateWorkout).delete(deleteWorkout)

module.exports = router;