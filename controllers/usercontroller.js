require('dotenv').config();      // Includes the .env file for reference in this file
var router = require('express').Router();
var sequelize = require('../Db');
var User = sequelize.import('../models/user');
const validateSession = require('../middleware/validate-session');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');



/**************************************************
* GET All Users for the Signed In Salesperson (id)
***************************************************/

router.get('/', validateSession, (req, res) => {

    User.findAll({
        where: {salesUserID: req.user.salesUserID}
    })
      .then(users => res.status(200).json(users))
      .catch(err => res.status(500).json({error:err}))

});



/****************************************
* GET A User by ID
****************************************/

router.get('/:id', validateSession, (req, res) => {

    User.findAll({
        where: {
            id: req.params.id
        }
    })
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).json({error:err}))

});




/****************************************
* CREATE User
****************************************/

router.post('/', validateSession, (req, res) => {

    const user = {
        "firstName" : req.body.user.firstName,
        "lastName" : req.body.user.lastName,
        "email" : req.body.user.email,
        "userTypeID" : req.body.user.userTypeID,
        "salesUserID" : req.body.user.salesUserID,
        "mobileNum" : req.body.user.mobileNum,
        "fbMsgrID" : req.body.user.fbMsgrID,
        "password" : req.body.user.password,
    }

    User.create(user)
      .then(user => {res.status(200).json(user);})
      .catch(err => res.json(req.errors))

});




/****************************************
* UPDATE User
****************************************/

router.put('/:id', validateSession, (req, res) => {

    const user = {
        "firstName" : req.body.user.firstName,
        "lastName" : req.body.user.lastName,
        "email" : req.body.user.email,
        "userTypeID" : req.body.user.userTypeID,
        "salesUserID" : req.body.user.salesUserID,
        "mobileNum" : req.body.user.mobileNum,
        "fbMsgrID" : req.body.user.fbMsgrID,
        "password" : req.body.user.password,
    }

    User.update(user, {where: {id: req.params.id}})
      .then(user => {res.status(200).json(user);})
      .catch(err => res.json(req.errors))

});




/****************************************
* Delete Individual User
****************************************/

router.delete('/:id', validateSession, (req, res) => {

    User.destroy({where: {id: req.params.id}})
      .then(user => {res.status(200).json(user);})
      .catch(err => res.json(req.errors))

});




module.exports = router;