import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
  title: { type: String, required: false },
  content: { type: String, required: false },
  user_id: { type: String, required: true },
  // if there is no meeting_id, this is a free note
  meeting_id: { type: String, required: false },
  meeting_title: { type: String, required: false },
  // created_at and updated_at timestamps will be automatically handled by mongoose
  //timestamps: true
});

export default mongoose.model("Note", noteSchema);