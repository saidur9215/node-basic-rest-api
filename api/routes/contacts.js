const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contact')
 

// Get 
router.get('/', contactController.getAllcontactController)

router.post('/', contactController.postNewContactController)

router.get('/:id', contactController.getSinglecontact)

router.delete('/:id', contactController.deleteSinglecontact) 
router.put('/:id', contactController.editContact) 



module.exports = router  