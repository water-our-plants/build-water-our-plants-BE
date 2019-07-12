const express = require('express')

const router = express.Router();

const db = require('../config/dbConfig.js')

router.get('/', async (req, res) => {
    let notifications = await db('watering');
    res.status(200).json(notifications);
});

module.exports = router;