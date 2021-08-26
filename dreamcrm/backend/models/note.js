import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    last_edited: {type: Date, required: true},
    title: {type: String, required: false},
    content: {type: String, required: false},
    user_id: {type: String, required: true},
});

export default mongoose.model("Note", noteSchema);