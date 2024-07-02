const express = require('express');
const router = express.Router();

const { getAllWorkouts, createWorkout, getWorkout, updateWorkout, deleteWorkout } = require('../controllers/workouts')

router.route('/').get(getAllWorkouts).post(createWorkout)
router.route('/:id').get(getWorkout).patch(updateWorkout).delete(deleteWorkout)

module.exports = router;