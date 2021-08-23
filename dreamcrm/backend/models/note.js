const mongoose = require("mongoose")
const Schema = mongoose.Schema;

    const noteSchema = new mongoose.Schema({
        note_id: {type: String, required: true},
        last_edited: {type: Date, required: true},
        title: {type: String, required: false},
        content: {type: String, required: false},
        user_id: {type: String, required: false} // if there is no user_id, this is a free note
})

const Note = mongoose.model("Note", noteSchema)

module.exports =Note