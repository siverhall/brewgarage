var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Recipe = mongoose.model('Recipe');
var Hop = mongoose.model('Hop');
var Malt = mongoose.model('Malt');
var Yeast = mongoose.model('Yeast');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* RECIPES */
router.get('/recipes', function(req, res,  next) {
   Recipe.find(function(err, recipes){
        if(err) { return next(err); }

        res.json(recipes);
   });
});

router.post('/recipes', function(req, res, next) {
    var recipe = new Recipe(req.body);

    recipe.save(function(err, recipe){
        if(err){ return next(err); }

        res.json(recipe);
    });
});

router.param('recipe', function(req, res, next, id) {
    var query = Recipe.findById(id);

    query.exec(function (err, recipe){
        if (err) { return next(err); }
        if (!recipe) { return next(new Error('can\'t find recipe')); }

        req.recipe = recipe;
        return next();
    });
});

router.get('/recipes/:recipe', function(req, res) {
    res.json(req.recipe);
});

module.exports = router;
