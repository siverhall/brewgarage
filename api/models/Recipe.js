var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
    title: String,
    style: String,
    batchsize: Number,
    boiltime: Number,
    mashtemp: Number,
    mashtime: Number,
    malts: [ {name: String, amount: Number} ],
    hops: [ {name: String, alpha: Number, amount: Number, time: Number} ],
    yeast: {name: String, temp: Number, days: Number},
    other: [{name: String, note: String}]
});

mongoose.model('Recipe', RecipeSchema);