const express = require('express');
const router = express.Router();
const { nuke } = require('../controllers/nuke')

router.route('/').post(nuke)

module.exports = router;