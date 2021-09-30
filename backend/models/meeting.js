import mongoose from "mongoose";

const meetingSchema = mongoose.Schema({
    date_time: {type: Date, required: false},
    attendees: {type: [String], default: []}, // stores contact ids
    user_id: {type: String, required: true},
    note_id: {type: String, required: false}, // meetings have at most one note
});

export default mongoose.model("Meeting", meetingSchema);