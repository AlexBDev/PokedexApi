var db = require('../db');

var PokemonModel = new Schema({ 
    pokemon_id: 'number',
    names: 'array',
    types: 'array',
    moves: 'array',
    sprites: 'mixed',
    stats: 'mixed',
    abilities: 'array'
});

var Pokemon = db.model('Pokemon', PokemonModel);

module.exports = Pokemon;
