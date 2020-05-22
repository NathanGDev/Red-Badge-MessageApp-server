require('dotenv').config();      // Includes the .env file for reference in this file
var router = require('express').Router();
var sequelize = require('../Db');
var UserType = sequelize.import('../models/userType');
const validateSession = require('../middleware/validate-session');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');



/***************************************************
* GET All UserTypes
***************************************************/

router.get('/', validateSession, (req, res) => {

    UserType.findAll({
   //     where: {salesUserID: req.user.salesUserID} // This should not be needed.  Admin will be CRUDing.
    })
      .then(userTypes => res.status(200).json(userTypes))
      .catch(err => res.status(500).json({error:err}))

});



/****************************************
* GET A UserType by ID
****************************************/

router.get('/:id', validateSession, (req, res) => {

    UserType.findAll({
        where: {
            id: req.params.id
        }
    })
      .then(userType => res.status(200).json(userType))
      .catch(err => res.status(500).json({error:err}))

});




/****************************************
* CREATE UserType
****************************************/

router.post('/', validateSession, (req, res) => {

    const userType = {
        "userType" : req.body.usertype.userType,
        "description" : req.body.usertype.description,
        "active" : req.body.usertype.active,
    }

    UserType.create(userType)
      .then(userType => {res.status(200).json(userType);})
      .catch(err => res.json(req.errors))

});




/****************************************
* UPDATE UserType
****************************************/

router.put('/:id', validateSession, (req, res) => {

    const userType = {
        "userType" : req.body.usertype.userType,
        "description" : req.body.usertype.description,
        "active" : req.body.usertype.active,
    }

    UserType.update(userType, {where: {id: req.params.id}})
      .then(userType => {res.status(200).json(userType);})
      .catch(err => res.json(req.errors))

});




/****************************************
* Delete Individual Contact
****************************************/

router.delete('/:id', validateSession, (req, res) => {

    UserType.destroy({where: {id: req.params.id}})
      .then(userType => {res.status(200).json(userType);})
      .catch(err => res.json(req.errors))

});




module.exports = router;