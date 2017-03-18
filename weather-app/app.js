const yargs   = require("yargs");
const request = require("request");
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");
const argv    = yargs
  .options({
    address: {
      describe: "Address to fetch weather for.",
      demand: true,
      alias: 'a',
      string: true
    }
  })
  .help().alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errMessage, results) => {
  if(errMessage) {
    console.log(errMessage);
  } else {
    console.log("Address: " + results.address);
    weather.getWeather(results.latitude, results.longitude, (errMessage, results) => {
      if(errMessage) {
        console.log(errMessage);
      } else {
        console.log("Temperature: " + results.temp);
        console.log("Apparent Temp: " + results.apparent);
        console.log("Humidity: " + results.humidity);  
      }
    });
  }
});

// https://api.darksky.net/forecast/63568149d7f09ca0fddcdda44db20ffe/37.8267,-122.4233