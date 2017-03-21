const express = require("express")
var app     = express();

app.get("/", (req, res) => {
  res.status(404).send({
    error: "Page not found.",
    name: "Todo App"
  })
});

app.get("/users", (req, res) => {
  res.status(200).send({
    name: "mikael airlangga",
    age: 27
  }, {
    name: "andrew mead",
    age: 25
  }, {
    name: "jen",
    age: 19
  })
});

app.listen(3000, () => {
  console.log("listen to port 3000, app is running.")
})

module.exports.app = app;