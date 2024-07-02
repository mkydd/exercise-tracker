const express = require('express');
const app = express();
require('dotenv').config()

const port = process.env.PORT || 3000;

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