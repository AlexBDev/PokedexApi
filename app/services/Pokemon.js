var PokemonModel = require('../models/Pokemon');
var _ = require('lodash');

var Pokemon = {
    add: function (responseJson, poke) {
        if (_.isNil(poke)) {
            poke = new PokemonModel();
        }
        
        poke.pokemon_id = responseJson.id;
        poke.name = responseJson.name;
        poke.types = [];        
        poke.moves = [];

        for (var i in responseJson.types) {
            poke.types.push(responseJson.types[i].type.name);
        }

        for (var i in responseJson.moves) {
            poke.moves.push(responseJson.moves[i].move.name);
        }

        return poke;
    }
}

module.exports = Pokemon;