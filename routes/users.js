const express = require('express')
const Users = require('../models/userModel.js') 
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const secrets = require('../config/secrets.js')

function generateToken(user) {
    const payload = {
      id: user.id
    };
  
    const signOptions = {
        expiresIn:  "12h",
    };
  
    return jwt.sign(payload, secrets.jwt, signOptions);
  }

//Testing welcome message when hitting endpoint
router.get('/', async(req, res) => {
    try {
        res.status(200).json({message: "Welcome!"})
    } catch(err) {
        res.status(500).json({error: "Cannot retrieve message"})
    }
})

// REGISTER post
router.post('/register', async(req, res) => {
    let user = req.body

    //Encrypst the password
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash

    await Users.add(user)
        .then(saved => {
            //Generates token
            const token = generateToken(saved)
            //decoded gets the user id of the user
            let decoded = jwt.decode(token)

            res.status(200).json({
                message: `Welcome ${user.username}`,
                token: token,
                id: decoded.id
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})

module.exports = router