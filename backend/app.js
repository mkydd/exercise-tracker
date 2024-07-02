const express = require('express');
const app = express();
const workouts = require('./routes/workouts')
require('dotenv').config()


// routes
app.use('/api/v1/users/workouts', workouts)

const port = process.env.PORT || 5001;

const start = () => {
  try {
    app.listen(port, console.log(`Server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()

// Routes
// user/workout -> Get, Post (all workouts)
// user/workout/:id -> Get, Patch, Delete (specific workout)