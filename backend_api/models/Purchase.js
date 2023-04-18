const mongoose = require('mongoose')
const Purchase = mongoose.model('Purchase', {
    name: String,
    price: Number,
    weight: Number,
    date: Date
})

module.exports = Purchase