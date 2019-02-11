const Contact = require('../models/contact') 

const getAllcontactController = (req, res, next) => {
    Contact.find()
       .then(contact => {
           res.status(200).json({
               message: 'Contacts found',
               contact
           })
       })
       .catch(error => {
           console.log(error)
           res.status(5000).json({
               message: 'Error occured',
               error: error
           })
       })
}

const postNewContactController = (req, res, next) => {
    const contact = new Contact({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email
    })
    contact.save()  
    .then(data => {
        res.status(201).json({
            message: 'Contact save in database successfully',
            contact: data 
        })
    })
    .catch(error => { 
        console.log(error)
        res.status(5000).json({
            message: 'Error occured',
            error: error
        })
    })
}
const getSinglecontact = (req, res, next) => {
    let id = req.params.id
    Contact.findById(id)
    .then(contact => {
        res.status(200).json({
            contact
        }) 
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message:'Error occured',
            error
        })
    })

}
const deleteSinglecontact = (req, res, next) => {
    let id = req.params.id
    Contact.findByIdAndRemove(id)
    .then(result => {
       res.json({
           message: 'contact deleted',
           result
       })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message:'Error occured',
            error
        })
    })
}
const editContact = (req, res, next) => {
    let id = req.params.id
    let updatedContact ={
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }
    Contact.findByIdAndUpdate(id, {$set: updatedContact})
    .then(result => {
        Contact.findById(result._id)
        .then(newresult => {
            res.json({
                message: 'Contact updated',
                newresult
            })
        }) 
        
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message:'Error occured',
            error
        })
    })
    
}
module.exports = {
    getAllcontactController, 
    postNewContactController,
    getSinglecontact,
    deleteSinglecontact,
    editContact
}