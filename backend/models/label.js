import mongoose from "mongoose";

const labelSchema = mongoose.Schema({
    colour: {type: Number, enum: [010, 100, 001], required: true}, // fill in with colour codes
    title: {type: String, required: true},
});

export default mongoose.model("User", userSchema);