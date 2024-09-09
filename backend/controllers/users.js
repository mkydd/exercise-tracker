const User = require('../models/User')
const Workout = require('../models/Workout')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const deleteAuthUser = require('../middleware/auth0-delete-user')
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

const createUser = asyncWrapper(async (req, res, next) => {
  const userTokenId = req.auth.payload.sub;

  const duplicateUser = User.findOne({ auth0Id: userTokenId})

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

  if (duplicateUser || userTokenId !== req.body.auth0Id) {
    console.log('duplicateUser =', duplicateUser ? true : false)
    console.log('userTokenId !== req.body.auth0Id = ', userTokenId !== req.body.auth0Id)
    return next(createCustomError(`Error creating user, please try again`, 500), req,res)
  }
  const user = await User.create(userData)

  if (!user) {
    return next(createCustomError(`Error creating user, please try again`, 500), req,res)
  }

  const workoutList = await Workout.create({ userId: user._id, workouts: [] })

  if (!workoutList) {
    return next(createCustomError(`Error creating users workoutList, please try again`, 500), req,res)
  }

  res.status(201).json({ user, workoutList })
})

const getUser = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id })

  if (!user) {
    return next(createCustomError(`No user with id : ${req.params.id}`, 404), req,res)
  }

  res.status(200).send( user )
})

const updateUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    {_id: req.params.id},
    req.body,
    { new: true,
    runValidators: true})

  if (!user) {
    return next(createCustomError(`No user with id: ${req.params.id}`, 404), req, res)
  }  

  res.status(200).json({ user })
})

const deleteUser = asyncWrapper(async (req, res, next) => {
  const user_auth0Id = req.params.id

  // get user from database
  const user = await User.findOne({ auth0Id: user_auth0Id })
  if (!user) {
    return next(createCustomError(`Error (find): No user with id: ${user_auth0Id}`, 404), req, res)
  }

  // delete user from database
  const deletedUser = await User.findOneAndDelete({ auth0Id: user_auth0Id })
  if (!deletedUser) {
    return next(createCustomError(`Error (delete): No user with id: ${user_auth0Id}`, 404), req, res)
  }

  // delete user workouts from database 
  const workoutList = await Workout.findOneAndDelete({ userId: user._id })
  if (!workoutList) {
    return next(createCustomError(`No workoutList for id: ${user_auth0Id}`, 404), req, res)
  }

  deleteAuthUser(user_auth0Id)

  res.status(200).json({ msg: 'deleted user' })
})

const getSingleUser = asyncWrapper(async (req, res, next) => {
  const userTokenId = req.auth.payload.sub;
  console.log('userId (token) =', userTokenId)
  
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

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getSingleUser
}