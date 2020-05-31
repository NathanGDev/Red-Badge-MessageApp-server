require("dotenv").config();
const http = require("http");
const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();

app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message("What the hell is going on with these Riots");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

http.createServer(
  app.listen(1336, () => {
    console.log(`Message server is listening on port 1337.`);
  })
);
