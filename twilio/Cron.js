const cron = require('node-cron');
const { sendMessage } = require('./send_sms.js');
const moment = require('moment');

const db = require('../config/dbConfig.js');


const smsWorker = cron.schedule(
    '0 18 * * *',
    () => {
      console.log("scheduler running");
      db("plants as p")
        .join("users as u", "u.id", "p.userId")
        .where({smsDelivered: false})
        .andWhere('watering_time', [
            moment().format()
        ])
    
        .select(
          "p.id",
          "u.username",
          "p.name",
          "p.watering_time",
          "u.phoneNumber",
          "p.smsDelivered"
        )
        .then(plants => {
          console.log("\n NOTIFICATIONS", plants);
          if (plants.length > 0) {
            plants.forEach(notification => {
              sendMessage(notification);
              db("plants")
                .where({ id: plants.id })
                .update({smsDelivered: true})
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