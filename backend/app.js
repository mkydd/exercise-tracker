const express = require('express');
const bodyParser  = require('body-parser');
const app = express();
const workouts = require('./routes/workouts')
const connectDB = require('./db/connect')
require('dotenv').config()
app.use(bodyParser.json());



// routes
app.use('/api/v1/users/workouts', workouts)

const port = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()

// Routes
// user/workout -> Get, Post (all workouts)
// user/workout/:id -> Get, Patch, Delete (specific workout)