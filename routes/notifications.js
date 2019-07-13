const express = require('express')

const router = express.Router();

const db = require('../config/dbConfig.js')

router.get('/', async (req, res) => {
    let watering = await db('watering');
    res.status(200).json(watering);
});

// get all notifications for a user at userId
router.get('/getWaterDay/:id', async(req, res) => {
    let {id} = req.params

    await db('watering')
        .then(waterDay => {
            const filtered = waterDay.filter(myWater => {
                return myWater.userId == id
            })
            res.status(200).json(filtered)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
  
  router.post('/addWaterDay', (req, res) => {
    console.log('\n REQ BODY', req.body);
    if (Array.isArray(req.body)) {
      db('watering')
        .insert(req.body)
        .returning('*')
        .then(water => res.status(201).json(water))
        .catch(err => res.status(500).json(err));
    } else {
      const { watering_time, smsDelivered, plant_id, userId } = req.body;
      if (!plant_id || !userId) {
        res.status(400).json({
          message: 'Request must contain a PlantID and UserID.',
        });
      } else {
        db('watering')
          .insert({ watering_time, smsDelivered, plant_id, userId })
          .returning('*')
          .then(water => res.status(201).json(water))
          .catch(err => res.status(500).json(err));
      }
    }
  });
  
  

module.exports = router;