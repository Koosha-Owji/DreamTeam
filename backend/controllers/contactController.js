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
    const label_id = req.body.label_id;
    const labels=[];


    if (!req.user_id) return res.status(400).json({ message: "User doesn't exist" });
    const user = await userModel.findOne({ _id: req.user_id});
    if (! user) return res.status(400).json({ message: "User doesn't exist" });

    if (req.body.first_name && req.body.email_address){
        const newContact =new Contact({
            first_name,
            last_name, business, relationship,
            email_address, phone_number, description, labels, user_id: req.user_id
        });
      (await newContact)
        .save()
        .then((newContact) => res.json(newContact))
        .catch((err) => res.status(400).json(err));
        newContact.labels.push(label_id)
        newContact.save()
      } else {
        return res.status(400).json({ message: "Contact does not have any first name and/or email" });
      }
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
         contact.labels = req.body.labels;

         contact.save()
         .then(() => res.send(contact))
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
     try {
         const contact = await Contact.findById(req.params.id).exec();


         // check that the note exists
         if (!contact) return res.json(null);
         // if the note exists, return it
         return res.json(contact);

     } catch (err) {
         res.status(500).json({ message: "contact retrieval failed" });
     }
 }

 /**
  * Given a contact id and a label id, insert the label id into a labelId array stored
  * in the contact.
  * @param {request with "label_id" in the body and "id" (the contact_id) in the params} req
  * @param {response by which the updated contact json object will be sent} res
  * @returns {the response}
  */
  export const label_contact = async (req, res) => {

    if (!req.user_id) return res.status(400).json({ message: "User doesn't exist" });
     const user = await userModel.findOne({ _id: req.user_id});
     if (! user) return res.status(400).json({ message: "User doesn't exist" });

     try {
         // retrieve the contact by its id and insert the lable id into the labelId
         // array of the contact
         const label_id = req.params.label_id;
         await Contact.updateOne(
             {_id: req.params.contact_id},
             // only add the label id if it isn't already in the array
             //labels:{$ne: label_id}},
             {$push: {labels: label_id}})

         const contact = await Contact.findById(req.params.contact_id).exec();
         return res.send(contact);

     } catch (err) {
         res.status(400).json(err);
     }

 }

 /**
  * Given a contact id and a label id, remove the label id from the labelId array stored
  * in the contact.
  * @param {request with "label_id" in the body and "id" (the contact_id) in the params} req
  * @param {response by which the updated contact json object will be sent} res
  * @returns {the response}
  */
 export const delabel_contact = async (req, res) => {
     try {
         // retrieve the contact by its id and delete the lable id from the labelId
         // array of the contact
         await Contact.updateOne(
             {_id: req.params.contact_id},
             {labels: req.body})

         const contact = await Contact.findById(req.params.contact_id).exec();
         return res.send(contact);

     } catch (err) {
         res.status(400).json('Error: ' + err);
     }
 }
