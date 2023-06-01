const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

function connectMongodb(MONGO_URI){
    return mongoose.connect(MONGO_URI)
}

module.exports = {
    connectMongodb
}