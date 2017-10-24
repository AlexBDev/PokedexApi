var db = require('../db');
var Schema = db.Schema;

var PokemonModel = new Schema({ 
    pokemon_id: 'number',
    name: 'string',
    types: 'array'
});

var Pokemon = db.model('Pokemon', PokemonModel);

module.exports = Pokemon;
