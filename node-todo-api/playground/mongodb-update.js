// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    return console.log("unable to connect to mongodb server.");
  }
  console.log("connected to mongodb server.");

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('58d26f977b355d9b3db8967c')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('58d26114e14a45a03c677e22')
  }, {
    $set: {
      name: "Mikael Airlangga"
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});