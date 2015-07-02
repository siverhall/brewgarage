var mongoose = require('mongoose');

var YeastSchema = new Mongoose.Schema({
    name: String,
    temp: Number,
    days: Number
});

mongoose.model('Yeast', YeastSchema);