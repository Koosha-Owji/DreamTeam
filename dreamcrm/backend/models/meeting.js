const mongoose = require("mongoose")
const Schema = mongoose.Schema;

    const meetingSchema = new mongoose.Schema({
        meeting_id: {type: String, required: true},
        date_time: {type: Date, required: false},
        attendees: {type: [String], default: []}, // stores contact ids
        user_id: {type: String, required: true},
        note_id: {type: String, required: false} // meetings have at most one note
})

const Meeting = mongoose.model("Meeting", meetingSchema)

module.exports =Meeting