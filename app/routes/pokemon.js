var express = require('express');
var router = express.Router();
var PokemonResolver = require('../resolver/pokemon');
var PokemonService = require('../services/pokemon');
var PokemonListResolver = require('../resolver/pokemon-list');

router.get('/list', function (req, res) {
    PokemonListResolver(req.query).then(function (results) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(results)); 
    });
});

router.get('/:id', function(req, res) {
    PokemonResolver(req.params.id).then(function (Pokemon) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(Pokemon)); 
    });
});


// router.get('/catch/all', function(req, res) {
//     var promises = [];
//     var i = 1;
//         setTimeout(function () {
//             console.log(i);
//             promises.push(PokemonResolver(i));
//             i++;
//         }.bind(i), 1500);

//     Promise.all(promises).then(function (values) {
//         res.setHeader('Content-Type', 'application/json');
//         res.send(JSON.stringify('ok')); 
//     });
// });

module.exports = router;
