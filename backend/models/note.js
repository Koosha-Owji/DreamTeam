/**
 * note.js, mongoose schema for notes stored in CRM
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: {type: String, required: false},
    content: {type: String, required: false},
    user_id: {type: String, required: true},
    // if there is no meeting_id, this is a free note
    meeting_id: {type: String, required: false}
});

export default mongoose.model("Note", noteSchema);