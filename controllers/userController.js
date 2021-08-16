const mongoose = require("mongoose")
// import User model
const User = mongoose.model("User")
// get all Users
const getAllUsers = async (req, res) => {
    try {
        const Users = await User.find()
        return res.send(Users)
    } 
    catch (err) 
    {
        res.status(400)
        return res.send("Database query failed")
    }
}

// find one User by their id
const getOneUser = async (req, res) => {  
    try {
        const oneUser = await User.findOne( {first_name: req.params.first_name}).lean()
        if (oneUser === null) {   // no User found in database
            res.status(404)
            return res.send("User not found")
        }
        return res.send(oneUser)  // User was found
    } catch (err) {     // error occurred
        res.status(400)
        return res.send("Database query failed")
    }
}// remember to export the functions
module.exports = {getAllUsers,getOneUser}