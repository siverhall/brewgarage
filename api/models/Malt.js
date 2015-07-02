var mongoose = require('mongoose');

var MaltSchema = new mongoose.Schema({
    name: String,
    amount: Number
});

mongoose.model('Malt', MaltSchema);