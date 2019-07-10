const express = require('express')
// const Users = require('./routes/user') 
const router = express.Router()

router.get('/', async(req, res) => {
    try {
        res.status(200).json({message: "Welcome!"})
    } catch(err) {
        res.status(500).json({error: "Cannot retrieve message"})
    }
})

module.exports = router