import mongoose from "mongoose";

const meetingSchema = mongoose.Schema({
    // time : {type: Date, required: false},
    date_time : {type: Date, required: true},
    title: {type: String, required: true},
    agenda:  {type: String, required: false},
    attendees: {type: String, required: false}, // stores contact ids  had default: '' or []
    user_id: {type: String, required: true},
    date: {type: String, required: true},
    time: {type:String, required: true}
    //note_id: {type: String, required: false} // meetings have at most one note
});

export default mongoose.model("Meeting", meetingSchema);