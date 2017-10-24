var express = require('express');
var router = express.Router();
var PokemonResolver = require('../resolver/Pokemon');

/* GET home page. */
router.get('/pokemon/:id', function(req, res) {
    PokemonResolver(req.params.id).then(function (Pokemon) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(Pokemon)); 
    });
});

module.exports = router;
