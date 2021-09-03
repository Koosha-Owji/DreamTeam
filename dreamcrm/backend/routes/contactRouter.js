import express from "express";

import Contact from './../models/contact.js'

// add our router const user
const contactRouter = express.Router();

import { get_all_contacts, create_contact, delete_contact } 
from "../controllers/contactController.js";

contactRouter.get('/', get_all_contacts);

contactRouter.post('/', create_contact);

contactRouter.post('/delete/:id', delete_contact);


// export the router
export default contactRouter;