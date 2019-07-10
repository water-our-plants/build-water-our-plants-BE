const express = require('express')
const Users = require('../models/userModel.js') 
const router = express.Router()
const bcrypt = require('bcryptjs')

//Testing welcome message when hitting endpoint
router.get('/', async(req, res) => {
    try {
        res.status(200).json({message: "Welcome!"})
    } catch(err) {
        res.status(500).json({error: "Cannot retrieve message"})
    }
})

//REGISTER post
// router.post('/register', async(req, res) => {
//     let user = req.body


//     Users.
// })

module.exports = router