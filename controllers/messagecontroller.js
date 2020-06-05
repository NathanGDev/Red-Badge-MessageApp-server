require("dotenv").config(); // Includes the .env file for reference in this file
var router = require("express").Router();
var sequelize = require("../Db");
var Message = sequelize.import("../models/message");
const validateSession = require("../middleware/validate-session");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
/**************************************************
 * GET All Messages for the a contact id
 ***************************************************/
router.get("/contact/:id", validateSession, (req, res) => {
  Message.findAll({
    where: {
      contactId: req.params.id,
    },
  })
    .then((message) => res.status(200).json(message))
    .catch((err) => res.status(500).json({ error: err }));
});
/**************************************************
 * GET All Messages for the Signed In User/Salesperson
 ***************************************************/
// router.get("/", validateSession, (req, res) => {
//   Message.findAll({
//     where: { salesUserId: req.user.salesUserId },
//   })
//     .then((messages) => res.status(200).json(messages))
//     .catch((err) => res.status(500).json({ error: err }));
// });
/****************************************
 * GET A Message by Id
 ****************************************/
router.get("/:id", validateSession, (req, res) => {
  Message.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((message) => res.status(200).json(message))
    .catch((err) => res.status(500).json({ error: err }));
});

/****************************************
 * CREATE Message
 ****************************************/
router.post("/", validateSession, (req, res) => {
  // Send an SMS using Twilio with NODE.JS
  client.messages.create({
    body: req.body.message.message,
    from: process.env.TWILIO_SMS_NUM, // Twilio Number
    to: req.body.message.contactMobileNum,
  });
  const message = {
    contactId: req.body.message.contactId,
    userId: req.user.id,
    salesUserId: req.user.salesUserId,
    message: req.body.message.message,
    sent: req.body.message.sent,
    service: req.body.message.service,
  };
  Message.create(message)
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((err) => res.json(req.errors));
});
/****************************************
 * UPDATE Message
 ****************************************/
router.put("/:id", validateSession, (req, res) => {
  const message = {
    contactId: req.body.message.contactId,
    userId: req.body.message.userId,
    salesUserId: req.body.message.salesUserId,
    message: req.body.message.message,
    sent: req.body.message.sent,
    service: req.body.message.service,
  };
  Message.update(message, { where: { id: req.params.id } })
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((err) => res.json(req.errors));
});
/****************************************
 * Delete Individual Message
 ****************************************/
router.delete("/:id", validateSession, (req, res) => {
  Message.destroy({ where: { id: req.params.id } })
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((err) => res.json(req.errors));
});
module.exports = router;
