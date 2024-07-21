const user = require('../models/User')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const loginUser = asyncWrapper(async (req,res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({ msg: 'Please provide email and password'})
  }
})