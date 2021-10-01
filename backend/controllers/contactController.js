/**
 * contactController.js, controller functions for contact (get, get all, update, delete, create)
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import Contact from "../models/contact.js";
import userModel from "../models/user.js";

/**
 * Create new contact
 * @param {contact first name} first_name
 * @param {contact last name} last_name
 * @param {contact email} first_name
 * @param {contact phone_number} phone_number
 * @param {contact description} description
 * @param {contact business} business
 * @param {contact labels} [labedlID]
 * @param {contact last name} last_name
 * @returns {status message} 
 */
export const create_contact = async (req, res) =>{
    
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const business = req.body.business;
    const relationship=req.body.relationship;
    const email_address = req.body.email_address;
    const phone_number = req.body.phone_number;
    const description = req.body.description;
    const labelID = req.body.labelID;


    if (!req.user_id) return res.status(400).json({ message: "User doesn't exist" });
    //Find authenticated user
   const user = await userModel.findOne({ _id: req.user_id});
   //If not authenticated: return error message
   if (!user) return res.status(400).json({ message: "User doesn't exist" });
   
   //Create new contact
   const newContact =new Contact({
       first_name,last_name, business, relationship,
       email_address, phone_number, description,
       labelID, user_id: req.user_id
   });

   newContact.save()
   .then(() => res.json("Added new contact!"))
   .catch((err) => res.status(500).json({ message: "save contact failed" }));
};

/**
 * Get all contacts of logged in user
 * @param {logged in user's id} user_id
 * @returns {all contacts}  
 */
export const get_all_contacts = async (req, res) => {
    Contact.find({user_id: req.user_id})
    .then(contacts => res.status(200).json(contacts))
    .catch(err => res.status(400).json('Error: ' + err));
};

/**
 * Delete contact by input id
 * @param {id of contact to be deleted} id
 * @returns {status message} 
 */
export const delete_contact = async(req,res)=>{
    Contact.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json('Contact deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
}


/**
 * Update existing contact details
 * @param {contact first name} first_name
 * @param {contact last name} last_name
 * @param {contact email} first_name
 * @param {contact phone_number} phone_number
 * @param {contact description} description
 * @param {contact business} business
 * @param {contact labels} [labedlID]
 * @param {contact last name} last_name
 * @returns {status message} 
 */
export const update_contact = async(req, res)=>{

    Contact.findById(req.params.id)
    .then(contact =>{
        contact.first_name = req.body.first_name;
        contact.last_name = req.body.last_name;
        contact.business = req.body.business;
        contact.relationship=req.body.relationship;
        contact.email_address = req.body.email_address;
        contact.phone_number = req.body.phone_number;
        contact.description = req.body.description;

        contact.save()
        .then(() => res.json(contact))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err=>res.status(400).json('Error: ' +err));
}
         
/**
 * Get one existing contact
 * @param {id of contact to be retruned} id
 * @returns {contact} 
 */
export const get_contact= async(req,res)=>{
    Contact.findById(req.params.id)
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json('Error: ' + err));
}
