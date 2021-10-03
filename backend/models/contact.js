/**
 * contact.js, mongoose schema for contacts stored in CRM
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    first_name:{type: String, required: true},
    last_name:{type: String, required: false},
    business: {type: String, required: false},
    relationship: {type: String, required: false},
    email_address: {type: String, required: true}, 
    phone_number: {type: String, required: false},
    description: {type: String, required: false},
    //labelId: {type: [String], required: false},
    user_id: {type: String, required: true}, // identifies the user to which the contact belongs
    labels: {type: [String],ref:'labels', required: false}
})

export default mongoose.model("Contact", contactSchema, "contact");