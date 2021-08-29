const express = require('express')

// add our router const user
contactRouter = express.Router();

let Contact = require('./../models/contact');

// require the user controller
const contactController = require('../controllers/contactController.js')

router.route('/contacts').get((req, res) => {
    Contact.find()
      .then(contacts => res.json(contacts))
      .catch(err => res.status(400).json('Error: ' + err));
  });


// export the router
module.exports = contactRouter;