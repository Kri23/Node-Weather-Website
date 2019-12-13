// GeoLocation API (covert name to latitute&longitude)
// https://api.mapbox.com/geocoding/v5/mapbox.places/nashik.json?access_token=pk.eyJ1IjoiazIzIiwiYSI6ImNrMnhmYjNyZzBiNzUzYm9tdzhsb2o4eHAifQ.bS730XdsrOzIJw02HjA6Wg&limit=1

const req = require('request');

const geocode = (loc,callback) => {
    const geotag = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(loc)+".json?access_token=pk.eyJ1IjoiazIzIiwiYSI6ImNrMnhmYjNyZzBiNzUzYm9tdzhsb2o4eHAifQ.bS730XdsrOzIJw02HjA6Wg&limit=1";
    req({url:geotag, json:true},(error, response) => {
        if(error){
            callback("Unable to Connect to the Weather Network. Please Check You're Net Connections!!!",undefined);      
        }else if(response.body.features.length == 0){
            callback("InValid Location!!!",undefined);      
        }else{
            const data = {
                place : response.body.features[0].place_name,
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
            }
            callback(undefined,data);
        }        
    });
}

module.exports = geocode;