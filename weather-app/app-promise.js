const yargs   = require("yargs");
const axios   = require("axios");

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

var address = encodeURIComponent(argv.address);
var geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;

axios.get(geoCodeURL).then((res) => {
  if (res.data.status === "ZERO_RESULTS") {
    throw new Error("Unable to find that address.")
  }

  var lat = res.data.results[0].geometry.location.lat;
  var lng = res.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/63568149d7f09ca0fddcdda44db20ffe/${lat},${lng}`;
  console.log(res.data.results[0].formatted_address);

  return axios.get(weatherUrl);
}).then((res) => {
  var temperature = res.data.currently.temperature;
  var apparentTemperature = res.data.currently.apparentTemperature;
  var humidity = res.data.currently.humidity;
  console.log("Temperature: " + temperature);
  console.log("Apparent Temperature: " + apparentTemperature);
  console.log("Humidity: " + humidity);
}).catch((err) => {
  if (e.code = "ENOTFOUND") {
    console.log("unable to connect to API servers.")
  } else {
    console.log(e.message);
  }
});
// https://api.darksky.net/forecast/63568149d7f09ca0fddcdda44db20ffe/37.8267,-122.4233