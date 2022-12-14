/**
 * user.js, mongoose schema for user accounts stored in CRM
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email_address: { type: String, required: true },
  department: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
  refresh_token: { type: String, required: false },
  email_service: { type: String, required: false },
});

export default mongoose.model("User", userSchema);
