const express = require('express')

// add our router const user
contactRouter = express.Router()

// require the user controller
const contactController = require('../controllers/contactController.js')

contactRouter.get('/', (req, res) => {
    res.send('contact router page')
})


// export the router
module.exports = contactRouter

