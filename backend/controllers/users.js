const User = require('../models/User')


const getAllUsers = async (req, res) => {
  const users = await User.find({})
  res.status(200).json({ users })
}

const createUser = async (req, res) => {
  const user = await User.create(req.body)
  res.status(201).json({ user })
}

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  res.status(200).json({ user })
}

const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    {_id: req.params.id},
    req.body,
    { new: true,
    runValidators: true})

  res.status(200).json({ user })
}

const deleteUser = async (req, res) => {
  const user = await User.findOneAndDelete(req.params.id)
  res.status(200).json({ user })
}

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
}