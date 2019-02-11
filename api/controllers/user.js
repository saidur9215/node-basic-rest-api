const bcrypt = require('bcrypt')
const User = require('../models/User') 
const jwt = require('jsonwebtoken') 

const userRegistration = (req, res, next ) => {
       bcrypt.hash(req.body.password, 10, (error, hash) => {
           if(error) {
               res.json({
                   error: error
               })
           }
           let user = new User({  
            email: req.body.email,
            password: hash  
        })
        user.save() 
        .then( result => {
            res.status(201).json({
                Message: 'User created successfully',
                user: result 
            })
        })
        .catch(error => {
            res.json({
                error
            })
        })
           
       })
}

const getAllusers = (req, res, next) => {
    User.find()
    .then(users => {
        res.json({
            users
        })
    })
    .catch(error => {
        res.json({
            error
        })
    })
}

const userLogin = (req, res, next) => {
        let email = req.body.email
        let password = req.body.password

        User.findOne({email})
        .then(user => {
            if(user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) {
                        res.json({
                            message: 'Error occured'
                        })
                    }
                    if(result) {

                        let token = jwt.sign({email: user.email, _id: user._id}, 'SECRET',
                         {expiresIn: '2h'})  
                        res.json({
                            message: 'Login successfuly',
                            token 
                        })
                    } else {
                        res.json({
                            message: 'Password doesn\'t match' 
                        })
                    }
                })
            } else {
                res.json({
                    message: 'user not found '  
                })
            }

        })
        .catch(error => {
            res.json({
                error
            })
        }) 
}

module.exports = {
    userRegistration,
    getAllusers,
    userLogin
}