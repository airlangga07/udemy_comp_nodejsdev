// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("unable to connect to mongodb server.");
  }
  console.log("connected to mongodb server.");

  // deleteMany
  // db.collection('Todos').deleteMany({text: "eat lunch"}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: "eath lunch"}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // users example
  // db.collection('Users').deleteMany({name: "Mikael Airlangga"}).then((result) => {
  //   console.log(result);
  // })

  // db.collection('Users').findOneAndDelete({_id: new ObjectID('58d2611c347663a0469d36d6')}).then((result) => {
  //   console.log(result);
  // })

  // db.close();
});