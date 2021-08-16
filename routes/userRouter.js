const express = require('express')

// add our router const user
userRouter = express.Router()

// require the user controller
const userController = require('../controllers/userController.js')

// handle the GET request toget all users
userRouter.get('/user-info', userController.getAllUsers)

userRouter.get('/:first_name', userController.getOneUser)
// export the router
module.exports = userRouter

