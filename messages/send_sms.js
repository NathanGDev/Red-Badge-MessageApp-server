// Send a n SMS using Twiliop with Node.JS
const accountSid = "AC128b5612aefb50528785b1d3fa7a543e";
const authToken = "0d21461677e8c471a20f0b63a77ed749";
const client = require("twilio")(accountSid, authToken);

client.messages.create({
  body: "This is a test Text message from kaelon",
  from: "+12053902793", // Twillio Number
  to: "+13176266555",
});
