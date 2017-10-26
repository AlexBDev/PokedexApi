let PokemonModel = require('../models/pokemon');
var db = require('../db');
let _ = require('lodash');

let Pokemon = {
    build: function (jsonPokemon, jsonSpecies) {
        let poke = new PokemonModel();
        
        poke.pokemon_id = jsonPokemon.id;
        poke.names = []
        poke.types = [];        
        poke.moves = [];
        poke.stats = [];
        poke.abilities = [];
        poke.sprites = jsonPokemon.sprites;

        for (let i in jsonPokemon.types) {
            poke.types.push(jsonPokemon.types[i].type.name);
        }

        for (let i in jsonPokemon.moves) {
            poke.moves.push(jsonPokemon.moves[i].move.name);
        }

        for (let i in jsonPokemon.abilities) {
            poke.abilities.push(jsonPokemon.abilities[i].ability.name);
        }

        for (let i in jsonPokemon.stats) {
            let stat = {
                name: jsonPokemon.stats[i].stat.name,
                value: jsonPokemon.stats[i].base_stat
            }

            poke.stats.push(stat);
        }

        for (let i in jsonSpecies.names) {
            let name = {
                name: jsonSpecies.names[i].name,
                locale: jsonSpecies.names[i].language.name
            }

            poke.names.push(name);
        }

        return poke;
    },

    findOneByNameOrId: function(id, callback) {
        var query = {"pokemon_id": id};
        
        if (!_.isInteger(parseInt(id))) {
            var query = {"names.name": {$regex: id, $options: 'i'}}
        }

        PokemonModel.findOne(query, function (err, Pokemon) {
            callback(err, Pokemon);
        });
    },

    findAll: function(callback) {
        PokemonModel.find({}, function (err, Pokemon) {
            callback(err, Pokemon);
        });
    }
}

module.exports = Pokemon;