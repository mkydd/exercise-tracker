const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    }
  },
  email: {
    type: String,
    required: [true, 'provide a email for user']
  },
  password: {
    type: String
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