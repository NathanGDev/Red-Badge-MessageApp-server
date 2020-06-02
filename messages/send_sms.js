require('dotenv').config({ path: '../.env'});

// Send an SMS using Twilio with Node.JS
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

client.messages.create({
  body: "This is a test Text message from kaelon",
  from: process.env.TWILIO_SMS_NUM, // Twillio Number
  to: "+12602554797",
});
