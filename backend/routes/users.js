const express = require('express');
const router = express.Router();

const { getAllUsers, createUser, getUser, updateUser, deleteUser, getSingleUser } = require('../controllers/users')

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
router.route('/data').post(getSingleUser)

module.exports = router;