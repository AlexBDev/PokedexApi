var request = require('request');
var PokemonService = require('../services/pokemon');
const BASE_API = "http://pokeapi.co/api/v2";
var _ = require('lodash');

module.exports = function (pokemon_id) { 
    return new Promise(function (resolve, reject) {
        PokemonService.findOneByNameOrId(pokemon_id, function (err, Pokemon) {
            if (err) {
                reject(err);

                return;
            }

            if (!_.isNil(Pokemon)) {
                resolve(Pokemon);
            } else {
                let promises = [
                    new Promise(function (resolve, reject) { 
                        request(BASE_API+'/pokemon/'+pokemon_id, function (error, response, body) {
                            if (error) {
                                reject(error);
        
                                return;
                            }
                    
                            resolve(JSON.parse(body));
                        });
                    }),
                    new Promise(function (resolve, reject) { 
                        request(BASE_API+'/pokemon-species/'+pokemon_id, function (error, response, body) {
                            if (error) {
                                reject(error);
        
                                return;
                            }
                    
                            resolve(JSON.parse(body));
                        });
                    }),
                ];

                Promise.all(promises).then(values => {
                    let jsonPokemon = values[0];
                    let jsonSpecies = values[1];
                    
                    Pokemon = PokemonService.build(jsonPokemon, jsonSpecies);
                    Pokemon.save();

                    resolve(Pokemon);
                });
            }
        });
    })
};