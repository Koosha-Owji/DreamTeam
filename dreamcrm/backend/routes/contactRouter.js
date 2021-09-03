import express from "express";

import Contact from './../models/contact.js'

// add our router const user
const contactRouter = express.Router();

import { get_all_contacts, create_contact } 
from "../controllers/contactController.js";

//contactRouter.get('/', get_all_contacts);
contactRouter.route('/').get((req, res)=>{
    Contact.find()
    .then(contacts => res.json(contacts))
    .then(console.log(contacts))
    .catch(err => res.status(400).json('Error: ' + err));
});
contactRouter.post('/', create_contact);


// export the router
export default contactRouter;