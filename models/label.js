const mongoose = require("mongoose")
const Schema = mongoose.Schema

const labelSchema = new Schema({
    label_id: {type: String, required: true},
    colour: {type: Number, enum: [010, 100, 001], required: true}, // fill in with colour codes
    title: {type: String, required: true}
})

const Label = mongoose.model("Label", labelSchema)

module.exports = Label