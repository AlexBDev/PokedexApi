var request = require('request');
var PokemonListService = require('../services/pokemon-list');
const BASE_API = "http://pokeapi.co/api/v2";
var _ = require('lodash');

module.exports = function (params) { 
    return new Promise(function (resolve, reject) {
        PokemonListService.findByParams(params, function (err, results) {         
            if (err) {
                reject(err);

                return;
            }

            console.log(results);

            if (!_.isEmpty(results)) {
                resolve(results);
            } else {
                request(BASE_API+'/pokemon?limit=20&offset='+params.offset, function (error, response, body) {
                    if (error) {
                        reject(error);

                        return;
                    }
                    
                    var list = PokemonListService.build(JSON.parse(body));
                    console.log(list);

                    for (var i in list) {
                        list[i].save();
                    }

                    resolve(list);
                });
            }
        });
    })
};