require('dotenv').config({ path: '../.env'});

const http = require("http");
const express = require("express");
const { urlencoded } = require('body-parser');
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();
app.use(urlencoded({ extended: false }));

app.post("/sms", (req, res) => {
  console.log('*******Inside the app.post********');
  const twiml = new MessagingResponse();
  
  console.log(req.body.From);

  twiml.message("What the hell is going on with these Riots");
  console.log(twiml.message);
  
  res.writeHead(200, { "Content-Type": "text/xml" });
  console.log(twiml.toString());
  res.end(twiml.toString());
});

http.createServer(
  app.listen(process.env.TWILIO_SERVER_PORT, () => {
    console.log(`Message server is listening on port ${process.env.TWILIO_SERVER_PORT}.`);
    // console.log(
    //   `Message server is listening on port ${[process.env.TWILIO_SERVER_PORT]}.`
    // );
  })
);
