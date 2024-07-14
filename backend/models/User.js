const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: [true, 'provide a firstName for user']
    },
    lastName: {
      type: String,
      required: [true, 'provide a lastName for user']
    }
  },
  email: {
    type: String,
    required: [true, 'provide a email for user']
  },
  password: {
    type: String,
    required: [true, 'provide a user password']
  },
  stats: {
    weight: {
      type: Number,
    },
    age: {
      type: Number
    },
    height: {
      type: Number
    }
  }
})

module.exports = mongoose.model('User', UserSchema)