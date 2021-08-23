const express = require('express')

// add our router const user
userRouter = express.Router()

//Require model
let User = require('../models/user')

userRouter.route('/').get((req, res)=>{
    User.find()
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error: '+err));
})

userRouter.route('/add').post((req, res) => {
    const username = req.body.username;
  
    const newUser = new User({username});

    const first_name=req.body.first_name;
    const last_name=req.body.last_name;
    const email_address=req.body.email_address;
    const department=req.body.department;
    const role=req.body.role;
    const userid =req.body.userid;

    const newUser = new User({first_name, last_name, email_address
    ,department, role, userid});
  
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = userRouter;

