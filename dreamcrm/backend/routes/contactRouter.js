const express = require('express')

// add our router const user
contactRouter = express.Router()

// require the user controller
const contactController = require('../backend/controllers/contactController.js.js.js')

contactRouter.get('/', (req, res) => {
    res.send('contact router page')
})




// export the router
module.exports = contactRouter

