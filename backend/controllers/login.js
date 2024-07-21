const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const loginUser = asyncWrapper(async (req,res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ msg: 'please provide email and password'})
  }

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).json({ msg: 'email or password is invalid'})
  }

  const match = await bcrypt.compare(password, user.password)

  if (match) {
    jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        res.json({ err })
      }
      return res.send(token)
    })
  }else {
    return res.status(400).json({ msg: 'email or password is invalid'})
  }
}) 

module.exports = {
  loginUser
}