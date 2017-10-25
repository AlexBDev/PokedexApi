var request = require('request');
var PokemonModel = require('../models/Pokemon');
var PokemonService = require('../services/Pokemon');
var db = require('../db');
const BASE_API = "http://pokeapi.co/api/v2";
var _ = require('lodash');

module.exports = function (pokemon_id) { 
    return new Promise(function (resolve, reject) {
        var query = {"pokemon_id": pokemon_id};
        
        if (!_.isInteger(parseInt(pokemon_id))) {
            var query = {"names.name": {$regex: pokemon_id, $options: 'i'}}
        }

        PokemonModel.findOne(query, function (err, Pokemon){
            if (err) {
                reject(err);

                return;
            }

            if (!_.isNil(Pokemon)) {
                resolve(Pokemon);
            } else {
                let promises = 
                    [
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
                    
                    Pokemon = PokemonService.add(jsonPokemon, jsonSpecies);
                    Pokemon.save();


                    resolve(Pokemon);
                });

                // request(BASE_API+'/pokemon/'+pokemon_id, function (error, response, body) {
                //     if (error) {
                //         reject(error);

                //         return;
                //     }

                //     var responseJson = JSON.parse(body);
                    
                //     Pokemon = PokemonService.add(responseJson);
                //     Pokemon.save();
            
                //     resolve(Pokemon);
                // });
            }
        });
    })
};