import noteModel from "../models/note.js";
import userModel from "../models/user.js";
import meetingModel from "../models/meeting.js";
import mongoose from 'mongoose';

// Create a new note 
export const create_note = async (req, res) => {
    
    try {
        // Check that the user with "user_id" exists

        // Create the note and save it to the database
        const newNote = noteModel.create({...req.body, user_id: req.user_id});
        if (req.body.meeting_id === ''){
            (await newNote)
              .save()
              .then((newNote) => res.json(newNote))
              .catch((err) => res.status(400).json(err));
        } else {
             (await newNote)
               .save()
               .catch((err) => res.status(400).json(err));
        }
       

    } catch (error) {
        res.status(500).json({ message: "Note creation failed" });
    }
};

// Delete an existing note
export const delete_note = async (req, res) => {
    try {
        // attempt to delete the note that matches the user and note ids in the request
        noteModel.deleteOne({
            // user_id: req.body.user_id,
            _id: req.params.id}).exec()

        res.send("Successfully deleted note (or note does not exist)");

    } catch (error) {
        res.status(500).json({ message: "Note deletion failed" });
    }
};

// Retrieve all notes belonging to a single user
export const get_all_notes = async (req, res) => {
    try {
        
        const notes = await noteModel.find({user_id: req.user_id}).exec();
        if (!notes.length) return res.json( '');

        // if the user has notes, return the notes
        return res.json(notes);
        

    } catch (err) {
        res.status(500).json({ message: "Note retrieval failed" });
        console.log(" ");
    }
}

// Retrieve a single note by its id

// export const get_one_note = async (req, res) => {
//     try {
//         const note = await noteModel.findById(req.body._id)
//             .exec();

//         // check that the note exists
//         if (! note) return res.json("Note does not exist");
//         // if the note exists, return it
//         return res.json(note);

//     } catch (err) {
//         res.status(500).json({ message: "Note retrieval failed" });
//     }
// }

// REVIEW params?
export const get_one_note_by_meeting = async (req, res) => {
  try {
    const note = await noteModel.find({meeting_id:req.params.id}).exec();

    // check that the note exists
    if (!note) return res.json(null);
    // if the note exists, return it
    return res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Note retrieval failed" });
  }
};


// updates the content of a note and sends the updated version back via res
export const update_note = async (req, res) => {
    // console.log(req.params.id)
    // console.log(req.body)
    try {
        // update the note
        await noteModel.findOneAndUpdate({_id:req.params.id}, 
            {title: req.body.title, content: req.body.content}).exec();

        // get the updated version
        const note = await noteModel.findById(req.params.id).exec();

        // check that the note exists
        if (! note) return res.json("Note does not exist");

        // return the update note
        return res.json(note);

    } catch (err) {
        res.status(500).json({ message: "Note update failed" });
    }
}

// Retrive a note from the db and update its name
// export const rename_note = async (req, res) => {
//     try {
//         await noteModel.findByIdAndUpdate(req.body._id, 
//             {title: req.body.title}).exec();
        
//         // retrieve the updated note
//         const note = await noteModel.findById(req.body._id).exec();

//         // check that the note exists
//         if (! note) return res.json("Note does not exist");

//         // return the update note
//         return res.json(note);

//     } catch (err) {
//         res.status(500).json({ message: "Note rename failed" });
//     }
// }

// Retrive a note from the db and update its meeting_id
// export const assign_to_meeting = async (req, res) => {
//     try {
//         const note = await noteModel.findById({_id: req.body.note_id});
//         const meeting = await meetingModel.findById({meeting_id: req.body.meeting_id});

//         // check that the note exists
//         if (! note) return res.json("Note does not exist");

//         // check that the meeting exists
//         if (! meeting) return res.json("Meeting does not exist");

//         // if the note exists, update its content
//         note.meeting_id = req.body.meeting_id;

//         // return the update note
//         return res.json(note);

//     } catch (err) {
//         res.status(500).json({ message: "Note rename failed" });
//     }
// }