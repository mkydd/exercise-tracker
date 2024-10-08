const User = require('../models/User')
const Workout = require('../models/Workout')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const deleteAuthUser = require('../middleware/auth0-delete-user')
const resendVerificationEmail = require('../middleware/auth0-verification-email')
const bcrypt = require('bcrypt')

const getAllUsers = asyncWrapper(async (req, res, next) => {
  try {
    if (req.body.adminPasscode !== process.env.ADMIN_PASSCODE) {
      return next(createCustomError(`unauthorized: can not access route`, 403), req, res)
    }
  } catch (error) {
    return next(createCustomError(`unauthorized: can not access route`, 403), req, res)
  }
  const users = await User.find({})
  res.status(200).json({ users })
})

const createUser = asyncWrapper(async (req, res, next) => { // method only used by AUTH0 (not used on front-end)
  let userData = { 
    email: req.body.email, 
    auth0Id: req.body.auth0Id,
    isVerified: req.body.isVerified,
    name: {
      firstName: null,
      lastName: null
    },
    stats: {
      weight: null,
      age: null,
      height: null
    }
  }

  // make sure adminPasscode is NOT undefined in case process.env.ADMIN_PASSCODE id undefined
  if (req.body.adminPasscode !== process.env.ADMIN_PASSCODE) {
    return next(createCustomError(`Error creating user, please try again`, 500), req, res)
  }

  let user;

  try {
    user = await User.create(userData)
  } catch (error) {
    return next(createCustomError(`Error creating user, please try again`, 500), req, res)
  }

  if (!user) {
    return next(createCustomError(`Error creating user, please try again`, 500), req, res)
  }

  const workoutList = await Workout.create({ userId: user._id, workouts: [] })

  if (!workoutList) {
    return next(createCustomError(`Error creating users workoutList, please try again`, 500), req,res)
  }

  res.status(201).json({ user, workoutList })
})

const getUser = asyncWrapper(async (req, res, next) => {
  const userTokenId = req.auth.payload.sub;
  const id = req.params.id;
  let user;

  try {
    user = await User.findOne({ _id: id })
  } catch (error) {
    return next(createCustomError(`No user with id : ${req.params.id}`, 404), req,res)
  }

  if (!user || userTokenId !== user.auth0Id) {
    return next(createCustomError(`No user with id : ${req.params.id}`, 404), req,res)
  }

  res.status(200).json({ user })
})

const updateUser = asyncWrapper(async (req, res, next) => {
  const userTokenId = req.auth.payload.sub;

  const newData = structuredClone(req.body)
  delete newData._id
  delete newData.auth0Id

  const user = await User.findByIdAndUpdate(
    { _id: req.params.id },
    newData,
    { new: true,
      runValidators: true })

  if (!user || userTokenId != user.auth0Id) {
    return next(createCustomError(`No user with id: ${req.params.id}`, 404), req, res)
  }  

  res.status(200).json({ user })
})

const deleteUser = asyncWrapper(async (req, res, next) => {
  const userTokenId = req.auth.payload.sub;
  const auth0Id = req.params.id

  // get user from database (need user._id to delete workoutList)
  const user = await User.findOne({ auth0Id })

  if (!user || userTokenId != user.auth0Id) {
    return next(createCustomError(`No user with auth0Id: ${auth0Id}`, 404), req, res)
  }

  // delete user from database
  const deletedUser = await User.findOneAndDelete({ auth0Id })

  if (!deletedUser) {
    return next(createCustomError(`No user with auth0Id: ${auth0Id}`, 404), req, res)
  }

  // delete user workouts from database 
  const workoutList = await Workout.findOneAndDelete({ userId: user._id })
  if (!workoutList) {
    return next(createCustomError(`No workoutList for id: ${auth0Id}`, 404), req, res)
  }

  deleteAuthUser(auth0Id)

  res.status(200).json({ msg: 'User Succesfully Deleted' })
})

const getSingleUser = asyncWrapper(async (req, res, next) => {
  const userTokenId = req.auth.payload.sub;
  
  const { email } = req.body

  if (!email) {
    return next(createCustomError(`No email provided in request body`, 400), req, res)
  }

  const user = await User.findOne({ email })
  
  if (!user || userTokenId != user.auth0Id) {
    return next(createCustomError(`No user with email: ${email}`, 404), req, res)
  }
  
  user.password = undefined

  res.status(200).json({ user })
})

const getVerificationEmail = asyncWrapper(async (req, res, next) => {
  const auth0Id = req.params.auth0Id
  const userTokenId = req.auth.payload.sub;

  const user = await User.findOne({ auth0Id })

  if (!user || user.isVerified || auth0Id != userTokenId) {
    return next(createCustomError('Could not resend email. Please try again later.', 500))
  }

  try {
    resendVerificationEmail(auth0Id)
  } catch (error) {
    return next(createCustomError('Could not resend email. Please try again later.', 500))
  }

  res.status(200).json({ msg: 'verification email sent' })
})

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getVerificationEmail
}