const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [50, 'name can not be more than 50 characters']
  },
  date: {
    type: String,
    required: [true, 'must provide date']
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
    required: [true, 'must provide workout duration']
  },
  exercises: [{
    exerciseId: {
      type: String,
      required: [true, 'each exercise must contain an id']
    },
    sets: {
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
    }
  }]
});

module.exports = mongoose.model('Workout', WorkoutSchema);