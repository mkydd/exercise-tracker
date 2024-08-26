const User = require('../models/User')
const Workout = require('../models/Workout')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const deleteAuthUser = require('../middleware/auth0-delete-user')
const bcrypt = require('bcrypt')

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({})
  res.status(200).json({ users })
})

const createUser = asyncWrapper(async (req, res, next) => {
  let userData = { email: req.body.email, auth0Id: req.body.auth0Id }

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
  // const user = await User.findOneAndDelete({ _id: req.params.id })

  // if (!user) {
  //   return next(createCustomError(`No user with id: ${req.params.id}`, 404), req, res)
  // }
  console.log(999)
  deleteAuthUser(req.params.id)
  console.log(888)

  res.status(200).json({ msg: 'deleted user' })
})

const getSingleUser = asyncWrapper(async (req, res, next) => {
  const { email } = req.body

  if (!email) {
    return next(createCustomError(`No email provided in request body`, 400), req, res)
  }

  const user = await User.findOne({ email })
  
  if (!user) {
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