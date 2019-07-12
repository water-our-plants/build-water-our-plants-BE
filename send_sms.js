// Twilio Credentials stored in .env

require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;

const authToken = process.env.TWILIO_AUTH_TOKEN;


// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

module.exports = {
  sendMessage: notification => {
    client.messages
    .create({
      body: `Hi ${notification.username}! 🌿 Today you should Water  your (${notification.name}) plant 🌱.`,

    from: process.env.TWILIO_NUMBER,
    to: notification.phoneNumber
    })

    .then(message => console.log(message))
    .catch(err => console.error(err));
  }
};