var PokemonListModel = require('../models/pokemon-list');
var db = require('../db');
var _ = require('lodash');

var PokemonList = {
    build: function (json) {
        var list = [];

        for (var i in json.results) {
            var result = json.results[i];
            var poke = new PokemonListModel();

            poke.url = result.url;
            poke.name = result.name;

            list.push(poke);
        }

        return list;
    },

    findByParams: function(params, callback) {
        PokemonListModel.find({}, function (err, results) {
            callback(err, results)
            // console.log(Pokemon);
        }).skip(params.offset).limit(20);
    },
}

module.exports = PokemonList;