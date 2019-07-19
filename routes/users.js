const express = require('express')
const Users = require('../models/userModel.js') 
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const secrets = require('../config/secrets.js')
const db = require('../config/dbConfig.js')
const Plants = require('../models/plantsModel.js')

//protected route helper need to write

const protectedRoute = (req, res, next) => {
    const token = req.headers.authorization
    console.log(token)
    jwt.verify(token, secrets.jwt, (err, decoded) => {
        console.log("passed the middleware test")
        if(err){
            return res.status(500).send({message: "The token could not be verified"})
        }
        req.id = decoded.id
        console.log(req.id, "this user's id")
        next()
    })
}

//Generates the Token
function generateToken(user) {
    const payload = {
      id: user.id
    };
  
    const signOptions = {
        expiresIn:  "4d",
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

    //Encrypts the password
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
    await Users.findBy({username})
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
                    id: decoded.id,
                    phoneNumber: user.phoneNumber,
                    username: user.username
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

//PUT route to edit users

router.put('/editUser/:id', protectedRoute, async(req, res) => {

    try {
        const user = await Users.update(req.params.id, req.body)

        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message: 'The user could not be found'}) 
        }
    } catch(err) {
        res.status(500).json({
            message: 'Error updating the user!'
        })       
    }
})

//get route for users
router.get('/getAllUsers', async(req, res) => {

    await Users.get()
        .then(allUsers => {
            res.status(200).json(allUsers)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// get route for user by id to show list of plants
router.get('/getPlants/:id', protectedRoute, async(req, res) => {
    let {id} = req.params

    await db('plants')
        .then(allPlants => {
            const filtered = allPlants.filter(myPlants => {
                return myPlants.userId == id
            })
            res.status(200).json(filtered)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// post route for creating plants
router.post('/addPlants/:id', protectedRoute, async(req, res) => {
    let{id} = req.params
    let bod = req.body

    let plant = {...bod, userId: id}
        Plants.add(plant)
   
            .then(async(newPlant) => {
               const maPlants = await db('plants')        
                        .then(allPlants => {
                            const filtered = allPlants.filter(myPlants => {
                                return myPlants.userId == id
                            })
                            res.status(200).json(filtered)
                        })
                        .catch(err => {
                            res.status(500).json(err)
                        })
                res.status(200).json(maPlants)
            })
            .catch(err => {
                res.status(500).json(err)
            })
})


// PUT route to edit plants

router.put('/editPlants/:id', async(req, res) => {

    try {
        const user = await Plants.update(req.params.id, req.body)

        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message: 'The plant could not be found'}) 
        }
    } catch(err) {
        res.status(500).json({
            message: 'Error updating the plant'
        })       
    }
})

//DELETE route for plants

router.delete('/deletePlant/:id', async(req, res) => {
    const {id} = req.params
    const userId = req.body.userId


    Plants.remove(id)
        .then(async(newPlants) => {
            const maPlants = await db('plants')  
                        .then(allPlants => {
                            const filtered = allPlants.filter(myPlants => {
                                return myPlants.userId == userId
                            })
                            res.status(200).json(filtered)
                        })
                        .catch(err => {
                            res.status(500).json(err)
                        })  
            res.status(200).json(maPlants)      
        })
        .catch(err => {
            res.status(500).json(err)
        })
})



//router.get('/users/')



module.exports = router