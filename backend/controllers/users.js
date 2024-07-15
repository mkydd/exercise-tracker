const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({})
  res.status(200).json({ users })
})

const createUser = asyncWrapper(async (req, res) => {
  const user = await User.create(req.body)
  res.status(201).json({ user })
})

const getUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(createCustomError(`No user with id : ${req.params.id}`, 404), req,res)
  }

  res.status(200).json({ user })
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
  const user = await User.findOneAndDelete(req.params.id)

  if (!user) {
    return next(createCustomError(`No user with id: ${req.params.id}`, 404), req, res)
  }

  res.status(200).json({ user })
})

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
}