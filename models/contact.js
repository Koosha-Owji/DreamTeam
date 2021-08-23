const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    name: {
        first: {type: String, required: false}, 
        last: {type: String, required: false},
    },
    business: {type: String, required: false},
    relationship: {type: String, required: false},
    email_address: {type: String, required: false}, 
    phone_number: {type: String, required: false},
    description: {type: String, required: false},
    labels: {type: [Number], required: false},
    userid: {type: String, required: true} // identifies the user to which the contact belongs
    //contactid:{type: String, required: true}, // allows session to differentiate between customer and vendor
})

const Contact = mongoose.model("Contact", contactSchema)

module.exports =Contact