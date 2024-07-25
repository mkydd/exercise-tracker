const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const bcrypt = require('bcrypt')

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({})
  res.status(200).json({ users })
})

const createUser = asyncWrapper(async (req, res, next) => {
  let userData = req.body

  bcrypt.hash(userData.password, 10, async function(err, hash) {
    if (err) {
      return next(createCustomError(`Issue encrypting password`, 400), req,res)
    }
    console.log('hash =', hash)
    userData = {...userData, password: hash}

    const user = await User.create(userData)
    res.status(201).json({ user })
  });
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
  const user = await User.findOneAndDelete({ _id: req.params.id })

  if (!user) {
    return next(createCustomError(`No user with id: ${req.params.id}`, 404), req, res)
  }

  res.status(200).json({ user })
})

const getSingleUser = asyncWrapper(async (req, res, next) => {
  const { email } = req.body

  let user = await User.findOne({ email })
  user.password = undefined

  if (!user) {
    return next(createCustomError(`No user with email: ${email}`, 404), req, res)
  }

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