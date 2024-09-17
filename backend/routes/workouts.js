const express = require('express');
const router = express.Router();

const { getAllWorkouts, getWorkouts, updateWorkout, deleteWorkout, addWorkout } = require('../controllers/workouts')

router.route('/').get(getAllWorkouts)
router.route('/:id').get(getWorkouts).post(addWorkout).put(updateWorkout).delete(deleteWorkout)

module.exports = router;