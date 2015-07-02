var mongoose = require('mongoose');

var YeastSchema = new mongoose.Schema({
    name: String,
    temp: Number,
    days: Number
});

mongoose.model('Yeast', YeastSchema);