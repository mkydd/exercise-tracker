const User = require('../models/User')
const Workout = require('../models/Workout')
const asyncWrapper = require('../middleware/async')
const nukeMiddleware = require('../middleware/nuke')

const nuke = asyncWrapper(async (req, res) => {
  if (req.body.passcode === process.env.NUKE_PASSCODE) {
    const { auth0Nuked, dbNuked } = await nukeMiddleware()

    if (auth0Nuked && dbNuked) {
      return res.status(200).json({ msg: 'AUTH0 and DB NUKED!!!'})
    }
    return res.status(200).json({ Auth0_Status: auth0Nuked, DB_Status: dbNuked })
  }

  return res.status(500).json({ Auth0_Status: auth0Nuked, DB_Status: dbNuked })
})

module.exports = { nuke }