var db = require('../db');

var PokemonList = db.model(
    'PokemonList', 
    new db.Schema({ 
        url: 'string',
        name: 'string',
    })
);

module.exports = PokemonList;
