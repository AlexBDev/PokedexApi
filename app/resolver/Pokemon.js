var request = require('request');
var PokemonModel = require('../models/Pokemon');
var PokemonService = require('../services/Pokemon');
var db = require('../db');
const BASE_API = "http://pokeapi.co/api/v2";
var _ = require('lodash');

module.exports = function (pokemon_id) { 
    return new Promise(function (resolve, reject) {
        PokemonModel.findOne({"pokemon_id": pokemon_id}, function (err, Pokemon){
            if (err) {
                reject(err);

                return;
            }

            if (!_.isNil(Pokemon)) {
                resolve(Pokemon);
            } else {
                request(BASE_API+'/pokemon/'+pokemon_id, function (error, response, body) {
                    var responseJson = JSON.parse(body);
                    
                    Pokemon = PokemonService.add(responseJson);
                    Pokemon.save();
            
                    resolve(Pokemon);
                });
            }
        });
    })
};