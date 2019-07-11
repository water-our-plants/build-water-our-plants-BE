// Twilio Credentials stored in .env

require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;

const authToken = process.env.TWILIO_AUTH_TOKEN;


// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages.create(
  {
    to: '+12546247290',
    from: '+12542771304',
    body: 'This testing twilio!',
  },
  (err, message) => {
    console.log(message.sid);
  }
);