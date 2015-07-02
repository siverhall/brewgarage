var mongoose = require('mongoose');

var HopSchema = new mongoose.Schema({
    name: String,
    alpha: Number,
    amount: Number,
    time: Number
});

mongoose.model('Hop', HopSchema);