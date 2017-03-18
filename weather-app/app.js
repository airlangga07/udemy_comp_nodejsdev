const yargs   = require("yargs");
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
  }
});

