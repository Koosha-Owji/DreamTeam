const mongoose = require("mongoose")

    const contactSchema = new mongoose.Schema({
    first_name: {type: String, required: false}, 
    last_name: {type: String, required: false},
    business: {type: String, required: false},
    relationship: {type: String, required: false},
    //past_orders: {type: Number, required: false},
    //current_orders: {type: Number, required: false},
    email_address: {type: String, required: false}, 
    phone_number: {type: String, required: false},
    description: {type: String, required: false},
    labels: {type: [Number], required: false},
    contactid:{type:String, required:true}, // allows session to differentiate between customer and vendor
})

const Contact = mongoose.model("Contact", contactSchema)

module.exports =Contact