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
  

//add a new water day notification
//requires watering_time, plant_id, userId
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
  
  // edit a water Day
  //requires watering_time, plant_id and userID
  
  router.put('/editWaterDay/:id', (req, res) => {
    const { id } = req.params;
    const { watering_time,  plant_id, userId } = req.body;
  
    db('watering')
      .where({ id: id })
      .update({ watering_time,  plant_id, userId  })
      .returning('*')
      .then(water => {
        if (water) {
          res.status(200).json(water);
        } else if (!water) {
          res
            .status(404)
            .json({ message: "There isn't anyhting to update" });
        }
      })
      .catch(() => res.status(500).json({ message: 'server error' }));
  });

  //delete a water day requires wateringid
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('watering')
      .where({ id: id })
      .del()
      .then(water => {
        if (!water) {
          res.status(400).json({
            message:
              'There are no water days to delete corresponding with that id.',
          });
        } else {
          res
            .status(200)
            .json({ message: 'The water day was successfully deleted.' });
        }
      })
      .catch(() => res.status(500).json({ message: 'server error' }));
  });


module.exports = router;