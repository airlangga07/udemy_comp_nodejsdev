const express = require("express");
var app       = express();

app.get("/", (req, res) => {
  // res.send("<h1>Hello Express!</h1>");
  // sending an object
  res.send({
    name: "Andrew",
    likes: [ 'Biking', 'reading' ]
  })
});

app.get("/about", (req, res) => {
  res.send("About page.")
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to fulfill the request"
  });
});

app.listen(3000);