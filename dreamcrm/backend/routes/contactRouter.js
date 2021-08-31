import express from "express";

import Contact from './../models/contact.js'

// add our router const user
const contactRouter = express.Router();

import { get_all_contacts, create_contact } 
from "../controllers/contactController.js";

contactRouter.get('/', get_all_contacts);
//contactRouter.post('/', create_contact);

contactRouter.route('/').post((req, res) =>{
    
    
             const first_name = req.body.first_name;
            const last_name = req.body.last_name;
            const business = req.body.business;
            const relationship=req.body.relationship;
            const email_address = req.body.email_address;
            const phone_number = req.body.phone_number;
            const description = req.body.description;
            const labelID = req.body.labelID;
            
            const newContact =new Contact({
                first_name,
                 last_name, business, relationship,
                email_address, phone_number, description,
                labelID
            });
             console.log(req.body)
             console.log(newContact)
        
            newContact.save()
            .then(() => res.json("Added new contact!"))
            .catch((err) => res.status(400).json(err));
        });

// contactRouter.route('/').get((req, res) => {
//   Contact.find()
//     .then(contacts => res.json(contacts))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// contactRouter.route('/add').post((req, res) => {
//   const first_name = req.body.first_name;
//   const last_name = req.body.last_name;
//   const business = req.body.business;
//   const relationship = req.body.relationship;
//   const email_address = req.body.email_address;
//   const phone_number = req.body.phone_number;
//   const description = req.body.description;

//   const newContact = new Contact({
//     first_name, 
//     last_name,
//     business, 
//     relationship, 
//     email_address, 
//     phone_number, 
//     description
//   });

//   newContact.save()
//   .then(() => res.json('Contact added!'))
//   .catch(err => res.status(400).json('Error: ' + err));
// });

// contactRouter.post("/contacts/add", create_contact);
// contactRouter.get("/contacts", get_all_contacts);


// export the router
export default contactRouter;