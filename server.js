const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const configureRoutes = require('./routes/users.js')

const notificationsRoute = require('./routes/notifications.js')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api', configureRoutes)

server.use('/api/notifications', notificationsRoute)

module.exports = server