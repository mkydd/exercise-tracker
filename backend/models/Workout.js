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
    street: {
      type: String,
      trim: true,
      maxlength: [50, 'street can not be more than 50 characters']
    },
    city: {
      type: String,
      trim: true,
      maxlength: [50, 'city can not be more than 50 characters']
    },
    

  },
  // duration: {

  // },
  // exercises: {

  // }
});

module.exports = mongoose.model('Workout', WorkoutSchema);