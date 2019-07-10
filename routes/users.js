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

//LOGIN post
router.post('/login', async(req,res) => {
    let {username, password} = req.body

    //Looks to see if username matches database
    Users.findBy({username})
        .first()
        .then(user => {
            //Compares to see if password matches
            if(user && bcrypt.compareSync(password, user.password)) {
                //generates token
                const token = generateToken(user)
                //gets the user ID
                let decoded = jwt.decode(token)

                res.status(200).json({
                    message: `Welcome back ${user.username}`,
                    token: token,
                    id: decoded.id
                }) 
            } else {
                //If username or password incorrect, returns message
                res.status(500).json({message: "Sorry, username or password does not match. Try again."})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router