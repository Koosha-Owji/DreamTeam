import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name: {
        first: {type: String, required: false}, 
        last: {type: String, required: false},
    },
    business: {type: String, required: false},
    relationship: {type: String, required: false},
    email_address: {type: String, required: false}, 
    phone_number: {type: String, required: false},
    description: {type: String, required: false},
    labelId: {type: [String], required: false},
    // identifies the user to which the contact belongs
    userId: {type: String, required: true}, 
    // created_at and updated_at timestamps will be automatically handled by mongoose
    timestamps: true
})

export default mongoose.model("Contact", contactSchema);