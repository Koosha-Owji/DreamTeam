import noteModel from "../models/note.js";
import userModel from "../models/user.js"

// Create a new note 
export const create_note = async (req, res) => {
    
    const user_id = req.body.user_id;

    // set last_edited to the current time
    req.body.last_edited = Date.now();

    try {
        // Check that the user with "user_id" exists
        const user = await userModel.findOne({ _id: user_id });
        if (! user) return res.status(400).json({ message: "User doesn't exist" });

        // Create the note and save it to the database
        const newNote = noteModel.create(req.body);
        (await newNote).save()
            .then(() => res.json("Added new note!"))
            .catch((err) => res.status(400).json(err));

    } catch (error) {
        res.status(500).json({ message: "Note creation failed" });
        console.log(error);
    }
};

// Delete an existing note
export const delete_note = async (req, res) => {
    try {
        // attempt to delete the note that matches the user and note ids in the request
        noteModel.deleteOne({
            user_id: req.body.user_id,
            _id: req.body._id})

    } catch (err) {
        res.status(500).json({ message: "Note deletion failed" });
        console.log(error);
    }
};

// Retrieve all notes belonging to a single user
export const get_notes = async (req, res) => {
    try {
        const notes = await noteModel.findAll({user_id: req.body.user_id});

        // if the user has no notes, return a message
        if (! notes) return res.json("No notes associated with this user");

        // if the user has notes, return the notes
        return res.json(notes);

    } catch (err) {
        res.status(500).json({ message: "Note retrieval failed" });
        console.log(error);
    }
}

// Retrieve all notes that do not belong to a meeting

// Retrieve all notes that belong to a specific meeting
