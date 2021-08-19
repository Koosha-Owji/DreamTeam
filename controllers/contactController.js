const mongoose = require("mongoose")
// import Contact model
const Contact = mongoose.model("Contact")

// get all Contacts associated with a single user
/*
const getAllContacts(user_id) = async (req, res) => {
    try {
        //const contacts = await Contact.findAll( {user_id: req.params.user_id}).lean() 
        const contacts = await Contact.findAll( {user_id: user_id}).lean() 
        if (oneUser === null) {   // no User found in database
            res.status(404)
            return res.send("User not found")
        }
        return res.send(oneUser)  // User was found
    } catch (err) {     // error occurred
        res.status(400)
        return res.send("Database query failed")
    }
}*/


//module.exports{}


