const express = require('express');
const bodyParser  = require('body-parser');
const app = express();

const connectDB = require('./db/connect')
require('dotenv').config()
app.use(bodyParser.json());
const cors = require('cors');

const workouts = require('./routes/workouts')
const users = require('./routes/users')
const login = require('./routes/login')
const errorHandlerMiddleware = require('./middleware/error-handling')

// origins allowed to make api requests
app.use(cors({ origin: ['https://mk-exercise-tracker.netlify.app', 'http://localhost:3000', 'https://grammar-easily-click-description.trycloudflare.com'] }));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());


// routes
app.use('/api/v1/users/workouts', workouts)
app.use('/api/v1/users', users)
app.use('/api/v1/login', login)
app.use(errorHandlerMiddleware)

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