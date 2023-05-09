const mongoose = require('mongoose')
const PurchaseModel = mongoose.model('Purchase', {
    name: String,
    price: Number,
    weight: Number,
    date: Date
})

module.exports = PurchaseModel