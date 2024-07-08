const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [50, 'name can not be more than 50 characters']
  },
  date: {
    type: Date,
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
    }
  },
  // exercises: {

  // }
});

module.exports = mongoose.model('Workout', WorkoutSchema);