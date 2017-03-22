// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

// accesing ObjectID class from Mongo
var obj = new ObjectID();
console.log(obj);

// object destructuring, pulling out object property and directly assign it to variable, 
// available on ES6
var user = {name: "Andrew", age: 25};
var {name} = user;
console.log(name);

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("unable to connect to mongodb server.");
  }
  console.log("connected to mongodb server.")

  // create new collection, then insert new data
  // db.collection('Todos').insertOne({
  //   text: "Something to do",
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log("Unable to insert todo", err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // insert new doc into users
  db.collection('Todos').insertOne({
    name: "Mikael Airlangga",
    age: 27,
    location: "singapore"
  }, (err, result) => {
    if (err) {
      return console.log("Unable to insert data", err);
    }
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
  })

  db.close();
});