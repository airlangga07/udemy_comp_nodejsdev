const request = require("request");
const yargs   = require("yargs");

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
var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;

request({
  url: url,
  json: true
}, (err, res, body) => {
  if (err) {
    console.log("unable to connect to google servers.");
  } else if (body.status === "ZERO_RESULTS") {
    console.log("unable to find that address");
  } else if (body.status === "OK") {
    var jsonData = body.results[0];
    console.log(`Address: ${jsonData.formatted_address}`);
    console.log(`Location Latitude: ${jsonData.geometry.location.lat}`);
    console.log(`Location Longitude: ${jsonData.geometry.location.lng}`);  
  }
});