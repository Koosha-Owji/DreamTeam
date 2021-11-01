/**
 * contactRouter.js, backend URL routing for contact functions
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import express from "express";
//import Contact from './../models/contact.js'
import auth  from '../middleware/auth.js'


const contactRouter = express.Router();

import { get_all_contacts, create_contact, delete_contact, update_contact, get_contact, label_contact, delabel_contact } 
from "../controllers/contactController.js";

contactRouter.get('/',auth, get_all_contacts);

contactRouter.post('/',auth, create_contact);

contactRouter.get('/:id',auth, get_contact);

contactRouter.post('/delete/:id',auth, delete_contact);

contactRouter.patch('/update/:id',auth, update_contact);

contactRouter.patch('/update/:contact_id/label/:label_id',auth,  label_contact);

contactRouter.patch('/update/:contact_id/delabel/', auth, delabel_contact);

// export the router
export default contactRouter;