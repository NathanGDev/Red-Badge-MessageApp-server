require("dotenv").config({ path: "./Red-Badge-MessageApp-server/" });
var express = require("express");
var app = express();
var signin = require("./controllers/signincontroller");
var smsSender = require("./messages/send_sms");
var http = require("http");
var message = require("./controllers/messagecontroller");
var user = require("./controllers/usercontroller");
var contact = require("./controllers/contactcontroller");
var userType = require("./controllers/usertypecontroller");
var sequelize = require("./db");

sequelize.sync(); // tip: pass in {force: true} for resetting tables

app.use(express.json());

app.use(require("./middleware/headers"));

/********************
 * EXPOSED ROUTES
 ********************/
app.use("/signin", signin);
console.log(req)
/*******************************
 * PROTECTED ROUTES (Validated)
 *******************************/
// app.use(require("./middleware/validate-session"));
app.use("/message", message);
app.use("/user", user);
app.use("/contact", contact);
app.use("/usertype", userType);

// app.listen(3000, function() {
app.listen(process.env.PORT, function () {
  console.log(`Server is listening on port ${process.env.PORT}.`);
  // console.log('App is listening on 3000.');
});
