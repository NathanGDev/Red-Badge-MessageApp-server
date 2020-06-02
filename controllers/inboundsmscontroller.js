require('dotenv').config();      // Includes the .env file for reference in this file
var router = require('express').Router();
var sequelize = require('../Db');
var Message = sequelize.import("../models/message");
var Contact = sequelize.import('../models/contact');
var User = sequelize.import('../models/user');


const http = require("http");
const { urlencoded } = require('body-parser');
const MessagingResponse = require("twilio").twiml.MessagingResponse;

router.use(urlencoded({ extended: false }));


router.post("/", async (req, res) => {
    var toPhoneNum = req.body.To.slice(2,12);
    var fromPhoneNum = req.body.From.slice(2,12);

    // Get the Contact ID given the inbound FROM phone #
    const contactRecord = await Contact.findAll({
      where: {
          mobileNum: fromPhoneNum
      }
    })

    // Get the Sales User ID (= User ID as well) given the inbound TO phone #
    const userRecord = await User.findAll({
      where: {
          mobileNum: toPhoneNum
      }
    })

    const message = {
      contactId: contactRecord[0].id,
      userId: userRecord[0].salesUserId,
      salesUserId: userRecord[0].salesUserId,
      message: req.body.Body,
      sent: false,
      service: 'sms',
    };
  
    Message.create(message)
      .then((message) => {
        res.status(200).json(message);
      })
      .catch((err) => res.json(req.errors));
  
  });

  module.exports = router;
