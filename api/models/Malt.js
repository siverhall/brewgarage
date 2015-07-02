var mongoose = require('mongoose');

var MaltSchema = new Mongoose.Schema({
    name: String,
    amount: Number
});

mongoose.model('Malt', MaltSchema);