const cron = require('node-cron');
const { sendMessage } = require('./send_sms.js');
const moment = require('moment');

const db = require('../config/dbConfig.js');


const smsWorker = cron.schedule(
    '0 10 * * *',
    () => {
      console.log("scheduler running");
      db("watering as w")
        .join("plants as p", "w.plant_id", "p.id")
        .join("users as u", "u.id", "p.userId")
        .where({ smsDelivered: false })
    
        .select(
          "w.id",
          "u.username",
          "p.name",
          "p.description",
          "n.watering_time",
          "u.phoneNumber"
        )
        .then(watering => {
          console.log("\n NOTIFICATIONS", watering);
          if (watering.length > 0) {
            watering.forEach(notification => {
              sendMessage(notification);
              db("watering")
                .where({ id: watering.id })
                .update({ smsDelivered: true })
                .then(updated => console.log("\nUPDATED", updated));
            });
          }
        });
    },
    {
      scheduled: false
    }
  );
  
  module.exports = smsWorker;