const express = require("express");
const hbs     = require("hbs");
var app       = express();

app.set("view engine", "hbs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Home Page",
    currentYear: new Date().getFullYear(),
    welcomeMessage: "Hello Welcome to our page!"
  });
});

app.get("/about", (req, res) => {
  res.render("about", { 
    pageTitle: "About Page",
    currentYear: new Date().getFullYear()
  })
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to fulfill the request"
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});