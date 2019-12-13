    // https://api.darksky.net/forecast/9e24187f7239f9c74af5436bc685cfd4/19.9975,73.7898/?units=si
// Weather API link from darksky.net/dev

const req = require('request');

const getWeather = (latitude,longitude,callback) => {
    const lat = encodeURIComponent(latitude);
    const long = encodeURIComponent(longitude);
    const url = "https://api.darksky.net/forecast/9e24187f7239f9c74af5436bc685cfd4/"+lat+","+long+"/?units=si";
    req({url : url , json : true},(error, response) => {
        if(error){
            callback("Unable to Connect to the Weather Network. Please Check You're Net Connections!!!",undefined);       
        }else if(response.body.error){
            callback("InValid Location!!!",undefined);
        }else{
            callback(undefined,response);
        }     
    });
}

module.exports = getWeather;