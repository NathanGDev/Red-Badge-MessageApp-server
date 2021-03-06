require("dotenv").config(); // Includes the .env file for reference in this file
var router = require("express").Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var userType = sequelize.import("../models/userType");

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

/****************************************
 * Create User Endpoint
 ****************************************/

router.post("/create", function (req, res) {
  var firstName = req.body.user.firstName;
  var lastName = req.body.user.lastName;
  var email = req.body.user.email;
  var userTypeId = req.body.user.userTypeId;
  var salesUserId = req.body.user.salesUserId; // either the user themselves, or if an administrative assistant this is the salesperson they work for.
  var mobileNum = req.body.user.mobileNum;
  var fbMsgrId = req.body.user.fbMsgrId;
  var password = req.body.user.password;

  User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    userTypeId: userTypeId,
    salesUserId: salesUserId,
    mobileNum: mobileNum,
    fbMsgrId: fbMsgrId,
    passwordHash: bcrypt.hashSync(password, 10),
  }).then(function createSuccess(user) {
    var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    res.json({
      user: user,
      message: "created",
      sessionToken: token,
    });
  });
});

/****************************************
 * User Signin
 ****************************************/

router.post("/", function (req, res) {
  User.findOne({
    where: { email: req.body.user.email },
    include: [
      {
        model: userType,
        where: {},
      },
    ],
  }).then(
    function (user) {
      if (user) {
        bcrypt.compare(req.body.user.password, user.passwordHash, function (
          err,
          matches
        ) {
          if (matches) {
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user: user,
              userType: userType,
              message: "successfully authenticated",
              sessionToken: token,
            });
          } else {
            res
              .status(502)
              .send({ error: "Username and Password do not match." });
          }
        });
      } else {
        res.status(500).send({ error: "Failed to authenticate." });
      }
    },
    function (err) {
      res.status(501).send({ error: "Authentication Failure." });
    }
  );
});

module.exports = router;
