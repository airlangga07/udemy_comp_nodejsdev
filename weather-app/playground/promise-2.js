const request = require("request");

var geocodeAddress = (suppliedAddress) => {
  return new Promise((resolve, reject) => {
    var address = encodeURIComponent(suppliedAddress);
    var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${suppliedAddress}`;

    request({
      url: url,
      json: true
    }, (err, res, body) => {
      if (err) {
        reject("unable to connect to google servers.");
      } else if (body.status === "ZERO_RESULTS") {
        reject("unable to find that address");
      } else if (body.status === "OK") {
        var jsonData = body.results[0];
        resolve({
          address: jsonData.formatted_address,
          latitude: jsonData.geometry.location.lat,
          longitude: jsonData.geometry.location.lng
        });
      }
    });
  });
};

geocodeAddress("Jakarta 12250").then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
})