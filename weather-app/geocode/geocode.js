var request = require("request");

var geocodeAddress = (suppliedAddress, callback) => {
  var address = encodeURIComponent(suppliedAddress);
  var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${suppliedAddress}`;

  request({
    url: url,
    json: true
  }, (err, res, body) => {
    if (err) {
      callback("unable to connect to google servers.");
    } else if (body.status === "ZERO_RESULTS") {
      callback("unable to find that address");
    } else if (body.status === "OK") {
      var jsonData = body.results[0];
      callback(undefined, {
        address: jsonData.formatted_address,
        latitude: jsonData.geometry.location.lat,
        longitude: jsonData.geometry.location.lng
      });
    }
  });
}

module.exports = {
  geocodeAddress
}