require('dotenv').config();      // Includes the .env file for reference in this file
var router = require('express').Router();
var sequelize = require('../Db');
var Contact = sequelize.import('../models/contact');
const validateSession = require('../middleware/validate-session');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');



/***************************************************
* GET All Contacts for the Signed In Salesperson (id)
***************************************************/

router.get('/', validateSession, (req, res) => {

    Contact.findAll({
        where: {salesUserID: req.user.salesUserID}
    })
      .then(contacts => res.status(200).json(contacts))
      .catch(err => res.status(500).json({error:err}))

});



/****************************************
* GET A Contact by ID
****************************************/

router.get('/:id', validateSession, (req, res) => {

    Contact.findAll({
        where: {
            id: req.params.id
        }
    })
      .then(contact => res.status(200).json(contact))
      .catch(err => res.status(500).json({error:err}))

});




/****************************************
* CREATE Contact
****************************************/

router.post('/', validateSession, (req, res) => {

    const contact = {
        "firstName": req.body.contact.firstName,
        "lastName": req.body.contact.lastName,
        "mobileNum" : req.body.contact.mobileNum,
        "fbMsgrID" : req.body.contact.fbMsgrID,
        "salesUserID" : req.body.contact.salesUserID,
    }

    Contact.create(contact)
      .then(contact => {res.status(200).json(contact);})
      .catch(err => res.json(req.errors))

});




/****************************************
* UPDATE Contact
****************************************/

router.put('/:id', validateSession, (req, res) => {

    const contact = {
        "firstName": req.body.contact.firstName,
        "lastName": req.body.contact.lastName,
        "mobileNum" : req.body.contact.mobileNum,
        "fbMsgrID" : req.body.contact.fbMsgrID,
        "salesUserID" : req.body.contact.salesUserID,
    }

    Contact.update(contact, {where: {id: req.params.id}})
      .then(contact => {res.status(200).json(contact);})
      .catch(err => res.json(req.errors))

});




/****************************************
* Delete Individual Contact
****************************************/

router.delete('/:id', validateSession, (req, res) => {

    Contact.destroy({where: {id: req.params.id}})
      .then(contact => {res.status(200).json(contact);})
      .catch(err => res.json(req.errors))

});




module.exports = router;