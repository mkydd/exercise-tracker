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
  isVerified: {
    type: Boolean
  },
  email: {
    type: String,
    required: [true, 'provide a email for user']
  },
  password: {
    type: String
  },
  auth0Id: {
    type: String,
    required: [true, 'provide auth0Id for user'],
    unique: true
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