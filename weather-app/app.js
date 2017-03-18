const request = require("request");

// takes 2 arguments
// 1. options objects
// 2. callback function when the data is received
request({
  url: "https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia",
  json: true
}, (err, res, body) => {
  console.log(body);
})