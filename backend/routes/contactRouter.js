import express from "express";

import Contact from './../models/contact.js'
import auth  from '../middleware/auth.js'

// add our router const user
const contactRouter = express.Router();

import { get_all_contacts, create_contact, delete_contact, update_contact, get_contact } 
from "../controllers/contactController.js";

contactRouter.get('/',auth, get_all_contacts);

contactRouter.post('/',auth, create_contact);

contactRouter.get('/:id',auth, get_contact);

contactRouter.post('/delete/:id',auth, delete_contact);

contactRouter.patch('/update/:id',auth, update_contact);
// export the router
export default contactRouter;