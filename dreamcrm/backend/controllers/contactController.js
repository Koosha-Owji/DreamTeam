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
    
    // const user_id = req.body.user_id;
    // const { first_name, last_name, business, relationship,
    //      email_address, phone_number, description } = req.body;
    
    
         try {
            const newContact =new Contact({
                first_name,
                 last_name, business, relationship,
                email_address, phone_number, description,
                labelID
            });
             console.log(req.body, req.body.first_name)
             console.log(newContact)
        
            newContact.save()
            .then(() => res.json("Added new contact!"))
            .catch((err) => res.status(400).json(err));

    } catch (error) {
        res.status(500).json({ message: "Contact creation failed" });
    }
};

// Retrieve all contacts belonging to a single user
export const get_all_contacts = async (req, res) => {
    Contact.find()
    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json('Error: ' + err));
};
