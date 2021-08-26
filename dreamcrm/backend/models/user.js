const mongoose = require("mongoose")
const Schema = mongoose.Schema;

    const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true}, 
    last_name: {type: String, required: true},
    email_address: {type: String, required: true, unique: true}, 
    department: {type: String, required: true},
    role: {type: String, required: true},
    userid: {type: String, required: true}, 
})

const User = mongoose.model("User", userSchema)

module.exports =User