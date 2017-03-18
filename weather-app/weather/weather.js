const request = require("request");

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/63568149d7f09ca0fddcdda44db20ffe/${lat},${lng}`,
    json: true
  }, (err, response, body) => {
    if (err) {
      callback("unable to connect to dark sky servers")
    } else if (!err && response.statusCode === 200) {
      callback(undefined, { 
        temp: body.currently.temperature, 
        apparent: body.currently.apparentTemperature, 
        humidity: body.currently.humidity
      });
    } else {
      callback("Unable to fetch weather.");
    }
  });  
}

module.exports = {
  getWeather
}

