const yargs   = require("yargs");
const request = require("request");
const geocode = require("./geocode/geocode");
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
    console.log(JSON.stringify(results, undefined, 2));
    var lat = results.latitude;
    var lng = results.longitude;
    console.log("requesting the weather API: ")
    request({
      url: `https://api.darksky.net/forecast/63568149d7f09ca0fddcdda44db20ffe/${lat},${lng}`,
      json: true
    }, (err, response, body) => {
      if (err) {
        console.log("unable to connect to dark sky servers")
      } else if (!err && response.statusCode === 200) {
        console.log(JSON.stringify(body.currently, undefined, 2));  
      } else {
        console.log("Unable to fetch weather.");
      }
    });
  }
});

// https://api.darksky.net/forecast/63568149d7f09ca0fddcdda44db20ffe/37.8267,-122.4233