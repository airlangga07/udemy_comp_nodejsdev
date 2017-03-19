const express = require("express");
var app       = express();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
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

app.listen(3000, () => {
  console.log("server is up on port 3000");
});