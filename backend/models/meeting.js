/**
 * meeting.js, mongoose schema for meetings stored in CRM
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import mongoose from "mongoose";

const meetingSchema = mongoose.Schema({
  date_time: { type: Date, required: true },
  title: { type: String, required: true },
  agenda: { type: String, required: false },
  non_contact_attendees: { type: [String], required: false },
  contact_name_id: { type: [], required: false },
  contact_name: { type: [], required: false },
  user_id: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  endtime: { type: String, required: true },
});

export default mongoose.model("Meeting", meetingSchema);
