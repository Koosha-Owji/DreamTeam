import contactModel from "../models/contact.js";
import userModel from "../models/user.js";

export const create_contact = async (req, res) =>{
    const user_id = req.body.user_id;
    try {
        // Check that the user with "user_id" exists
        const user = await userModel.findOne({ _id: user_id });
        if (! user) return res.status(400).json({ message: "User doesn't exist" });

        // Create the contact and save it to the database
        const newContact = contactModel.create(req.body);
        (await newContact).save()
            .then(() => res.json("Added new note!"))
            .catch((err) => res.status(400).json(err));

    } catch (error) {
        res.status(500).json({ message: "Contact creation failed" });
    }
};

// Retrieve all notes belonging to a single user
export const get_all_contacts = async (req, res) => {
    try {
        const notes = await contactModel.find();

        // if the user has no notes, return a message
        if (! notes) return res.json("No notes associated with this user");

        // if the user has notes, return the notes
        return res.json(notes);

    } catch (err) {
        res.status(500).json({ message: "Note retrieval failed" });
        console.log(" ");
    }
}
