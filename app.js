const express = require('express');
const app = express();

require('./models/db');

//set up user route
userRouter = require('./routes/userRouter')
// set up contact route
contactRouter = require('./routes/contactRouter')

app.get('/', (req, res) => {
    res.send('<h1>IT Project 2021 Semester 2 Capstone</h1>')
})

//Handle user requests
app.use('/info', userRouter)

// Route for contacts
app.use('/contacts', contactRouter)

app.listen(3000, () => {
    console.log('The CRM app is listening on port 3000!')
})

