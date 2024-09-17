const express = require('express');
const app = express();

const bodyParser  = require('body-parser');
app.use(bodyParser.json());

const connectDB = require('./db/connect')
const cors = require('cors');
require('dotenv').config()

const workouts = require('./routes/workouts')
const users = require('./routes/users')
const nuke = require('./routes/nuke')
const rateLimiter = require('./middleware/rateLimiter')

const errorHandlerMiddleware = require('./middleware/error-handling')
const checkJWT = require('./middleware/checkJWT')

// origins allowed to make api requests
app.use(cors({ origin: ['https://mk-exercise-tracker.netlify.app'] }));

// limit request
app.use(rateLimiter)

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

// non-token routes
app.use('/api/v1/nuke', nuke)

// authorize user
app.use(checkJWT)

// routes
app.use('/api/v1/users/workouts', workouts)
app.use('/api/v1/users', users)
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