require('dotenv').config();      // Includes the .env file for reference in this file
var router = require('express').Router();
var sequelize = require('../Db');
var Message= sequelize.import('../models/message');
const validateSession = require('../middleware/validate-session');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');



/**************************************************
* GET All Messages for the Signed In User/Salesperson
***************************************************/

router.get('/', validateSession, (req, res) => {

    Message.findAll({
        where: {salesUserID: req.user.salesUserID}
    })
      .then(messages => res.status(200).json(messages))
      .catch(err => res.status(500).json({error:err}))

});



/****************************************
* GET A Message by ID
****************************************/

router.get('/:id', validateSession, (req, res) => {

    Message.findAll({
        where: {
            id: req.params.id
        }
    })
      .then(message => res.status(200).json(message))
      .catch(err => res.status(500).json({error:err}))

});




/****************************************
* CREATE Message
****************************************/

router.post('/', validateSession, (req, res) => {

    const message = {
        "contactID" : req.body.message.contactID,
        "salesUserID" : req.body.message.salesUserID,
        "message" : req.body.message.message,
        "sent" : req.body.message.sent,
        "dateTime" : req.body.message.dateTime,
        "service" : req.body.message.service,
    }

    Message.create(message)
      .then(message => {res.status(200).json(message);})
      .catch(err => res.json(req.errors))

});




/****************************************
* UPDATE Message
****************************************/

router.put('/:id', validateSession, (req, res) => {

    const message = {
        "contactID" : req.body.message.contactID,
        "salesUserID" : req.body.message.salesUserID,
        "message" : req.body.message.message,
        "sent" : req.body.message.sent,
        "dateTime" : req.body.message.dateTime,
        "service" : req.body.message.service,
    }

    Message.update(message, {where: {id: req.params.id}})
      .then(message => {res.status(200).json(message);})
      .catch(err => res.json(req.errors))

});




/****************************************
* Delete Individual Message
****************************************/

router.delete('/:id', validateSession, (req, res) => {

    Message.destroy({where: {id: req.params.id}})
      .then(message => {res.status(200).json(message);})
      .catch(err => res.json(req.errors))

});




module.exports = router;