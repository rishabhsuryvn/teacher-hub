require('dotenv').config({path: './config/config.env'})
const express = require('express')
const url = require('url')
const path = require('path')
const urlRoutes = require('./routes/routes')
const {connectMongodb} = require('./config/db')

// App setup
const app = express()
const PORT = process.env.PORT

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database setup

connectMongodb(`${process.env.MONGO_URI}`)
    .then(() => console.log('mongodb connected successfully'))
    .catch(err => console.log('Mongo Error: ', err))


// Views Setup
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// Routes
app.use('/', urlRoutes)
app.use('*', urlRoutes)

// App start
app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`)
})