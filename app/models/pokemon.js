var db = require('../db');

var Pokemon = db.model(
    'Pokemon', 
    new db.Schema({ 
        pokemon_id: 'number',
        names: 'array',
        types: 'array',
        moves: 'array',
        sprites: 'mixed',
        stats: 'mixed',
        abilities: 'array'
    })
);

module.exports = Pokemon;
