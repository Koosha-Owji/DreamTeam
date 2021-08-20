const mongoose = require("mongoose")
const Schema = mongoose.Schema;

// import Contact model
//const Contact = require('./contact');

    const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true}, 
    last_name: {type: String, required: true},
    email_address: {type: String, required: true, unique: true}, 
    department: {type: String, required: true},
    role: {type: String, required: true},
    //contacts: {type: [Number], required: true},
    userid: {type: String, required: true}, // allows session to differentiate between customer and vendor
})

const User = mongoose.model("User", userSchema)

module.exports =User