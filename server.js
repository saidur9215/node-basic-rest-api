const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyparser = require('body-parser')
const contactsRoute = require('./api/routes/contacts')
const usersRoute = require('./api/routes/user')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contacts-db');
const db = mongoose.connection
db.on('error', (err) => {
    console.log('err')
}) 
db.once('open', () => {
    console.log('Database connection established')  
})

const app = express() 
const PORT = process.env.PORT || 3000 
app.use(morgan('dev')) 
app.use(cors())    
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use('/api/contacts', contactsRoute)
app.use('/api/users', usersRoute)

app.get('/', (req, res) => { 
        res.send("Hello world")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`) 
})