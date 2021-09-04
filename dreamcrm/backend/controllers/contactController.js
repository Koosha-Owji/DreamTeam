import Contact from "../models/contact.js";
import userModel from "../models/user.js";

export const create_contact = async (req, res) =>{
    
    
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
};

// Retrieve all contacts belonging to a single user
export const get_all_contacts = async (req, res) => {
    Contact.find()
    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json('Error: ' + err));
};

export const delete_contact = async(req,res)=>{
    Contact.findByIdAndDelete(req.params.id)
    .then(() => res.json('Contact deleted.'))
    .then(console.log('contact deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
}

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
        .then(() => res.json('Contact updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err=>res.status(400).json('Error: ' +err));
}
