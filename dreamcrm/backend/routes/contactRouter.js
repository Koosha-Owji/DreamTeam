import express from "express";

import Contact from './../models/contact.js'

// add our router const user
const contactRouter = express.Router();

import { get_all_contacts, create_contact, delete_contact, update_contact, get_contact } 
from "../controllers/contactController.js";

contactRouter.get('/', get_all_contacts);

contactRouter.post('/', create_contact);

contactRouter.get('/:id', get_contact);

contactRouter.post('/delete/:id', delete_contact);

contactRouter.patch('/update/:id', update_contact);
// export the router
export default contactRouter;