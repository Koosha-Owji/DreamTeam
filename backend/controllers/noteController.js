/**
 * noteController.js, controller functions for note (get, get all, update, delete, create, assign to meeting)
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import noteModel from "../models/note.js";
import userModel from "../models/user.js";
import meetingModel from "../models/meeting.js";

/**
 * Create note
 * @param {id of authenticated user} user_id
 * @param {note body: title, content, timestamp} body
 * @returns {new note} 
 */
export const create_note = async (req, res) => {

    try {
        // Check that the user with "user_id" exists
        if (!req.user_id) return res.status(400).json({ message: "User doesn't exist" });

        const user = await userModel.findOne({ _id: req.user_id});
        if (! user) return res.status(400).json({ message: "User doesn't exist" });

        // Create the note and save it to the database
        const newNote = noteModel.create({...req.body, user_id: req.user_id});
        (await newNote).save()
            .then((newNote) => res.json(newNote))
            .catch((err) => res.status(400).json(err));

    } catch (error) {
        res.status(500).json({ message: "Note creation failed" });
    }
};

/**
 * Delete note by input id
 * @param {id of note to be deleted} id
 * @returns {status message} 
 */
export const delete_note = async (req, res) => {
    try {
        // attempt to delete the note that matches the note id in the request
        await noteModel.deleteOne({
            _id: req.params.id})

        return res
          .status(200)
          .send("Successfully deleted note (or note does not exist)");

    } catch (error) {
        res.status(500).json({ message: "Note deletion failed" });
    }
};

/**
 * Get all notes of logged in user
 * @param {logged in user's id} user_id
 * @returns {all notes}  
 */
export const get_all_notes = async (req, res) => {
    try {
        const notes = await noteModel.find({user_id: req.user_id});
        // if the user has no notes, return a message
        if (!notes.length) return res.status(200).json("");

        // if the user has notes, return the notes
        return res.status(200).json(notes);
        

    } catch (err) {
        res.status(500).json({ message: "Note retrieval failed" });
        console.log(" ");
    }
}

/**
 * Get one existing note
 * @param {id of note to be retruned} _id
 * @returns {note} 
 */
export const get_one_note = async (req, res) => {
    try {
        const note = await noteModel.findById(req.body._id)
            .exec();

        // check that the note exists
        if (! note) return res.json("Note does not exist");
        // if the note exists, return it
        return res.json(note);

    } catch (err) {
        res.status(500).json({ message: "Note retrieval failed" });
    }
}

/**
 * Update note
 * @param {id of authenticated user} user_id
 * @param {note content} content
 * @returns {updatednote} 
 */
export const update_note = async (req, res) => {
    try {
        // update the note
        await noteModel.findByIdAndUpdate(req.params.id, 
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

/**
 * Rename note
 * @param {id of authenticated user} user_id
 * @param {note title} title
 * @returns {updated note} 
 */
export const rename_note = async (req, res) => {
    try {
        await noteModel.findByIdAndUpdate(req.body._id, 
            {title: req.body.title}).exec();
        
        // retrieve the updated note
        const note = await noteModel.findById(req.body._id).exec();

        // check that the note exists
        if (! note) return res.json("Note does not exist");

        // return the update note
        return res.json(note);

    } catch (err) {
        res.status(500).json({ message: "Note rename failed" });
    }
}

/**
 * Assign note to meeting
 * @param {note id} note_id
 * @param {meeting id} meeting_id
 * @returns {updated note} 
 */
export const assign_to_meeting = async (req, res) => {
    try {
        const note = await noteModel.findById({_id: req.body.note_id});
        const meeting = await meetingModel.findById({meeting_id: req.body.meeting_id});

        // check that the note exists
        if (! note) return res.json("Note does not exist");

        // check that the meeting exists
        if (! meeting) return res.json("Meeting does not exist");

        // if the note exists, update its content
        note.meeting_id = req.body.meeting_id;

        // return the update note
        return res.json(note);

    } catch (err) {
        res.status(500).json({ message: "Note rename failed" });
    }
}
