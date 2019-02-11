const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                    return validator.isEmail(v) 
            },
            message: `{value} is not an valid email`
        }
    },
    password: String
})
 
const User = mongoose.model('User', userSchema)
module.exports = User   
