var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
    title: String,
    style: String,
    batchsize: Number,
    boiltime: Number,
    mash: {temp: Number, time: Number},
    malts: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Malt'} ],
    hops: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Hop'} ],
    yeast: {type: mongoose.Schema.Types.ObjectId, ref: 'Yeast'},
    other: [{name: String, note: String}]
});

mongoose.model('Recipe', RecipeSchema);