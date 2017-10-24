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
        for (var i in responseJson.types) {
            poke.types.push(responseJson.types[i].type.name);
        }

        return poke;
    }
}

module.exports = Pokemon;