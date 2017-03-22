// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("unable to connect to mongodb server.");
  }
  console.log("connected to mongodb server.");

  db.collection('Todos').find({
    // looking for object with the passed ID
    _id: new ObjectID('58d2590f7366e39c6cf5236e')
  }).toArray().then((docs) => {
    console.log("Todos");
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log("unable to fetch todos", err);
  })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log("Todos Count:", count);
  // }, (err) => {
  //   console.log("Failed to count todos.")
  // })

  db.collection('Users').find({
    name: "Mikael Airlangga"
  }).toArray().then((docs) => {
    console.log(docs, undefined, 2);
  }, (err) => {
    console.log("Failed to count todos.")
  })

  // db.close();
});