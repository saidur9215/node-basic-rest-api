const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')
const userController = require('../controllers/user')
router.post('/login', userController.userLogin ) 

router.post('/register', userController.userRegistration )  

router.get('/', authenticate, userController.getAllusers )     

module.exports = router 