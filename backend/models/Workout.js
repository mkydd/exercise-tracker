const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'provide userId']
  },
  workouts: [{
    name: {
      type: String,
      trim: true,
      maxlength: [50, 'name can not be more than 50 characters']
    },
    date: {
      year: {
        type: Number,
        required: [true, 'provide the year']
      },
      month: {
        type: Number,
        required: [true, 'provide the month']
      },
      day: {
        type: Number,
        required: [true, 'provide the day']
      }
    },
    location: {
      coordinates: {
        latitude: {
          type: Number
        },
        longitude: {
          type: Number
        }
      }
    },
    duration: {
      hours: {
        type: Number
      },
      minutes: {
        type: Number
      },
      seconds: {
        type: Number
      },
    },
    exercises: [{
      exerciseId: {
        type: String,
        required: [true, 'each exercise must contain an id']
      },
      sets: [{
        setNumber: {
          type: Number,
          required: [true, 'each set must contain a set number']
        },
        reps: {
          type: Number,
          required: [true, 'each set must contain a reps number']
        },
        weight: {
          type: Number,
          required: [true, 'each set must contain a weight number']
        }
      }]
    }]
  }]
});

module.exports = mongoose.model('Workout', WorkoutSchema);