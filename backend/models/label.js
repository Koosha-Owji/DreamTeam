/**
 * label.js, mongoose schema for labels stored in CRM
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import mongoose from "mongoose";

const labelSchema = mongoose.Schema({
  colour: {
    type: String,
    enum: ["#e57373", "#b39ddb", "#fff176", "#ff8a65", "#81c784", "#90caf9"],
    required: true,
  },
  title: { type: String, required: true },
  user_id: { type: String, required: true },
});

export default mongoose.model("Label", labelSchema);
