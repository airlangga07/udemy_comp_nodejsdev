const { ObjectID } = require("mongodb");
// a little not if you forgotten
// its the same as 
// const mongoose = require("mongoose");
// const ObjectID = mongoose.ObjectID
const { mongoose } = require("./../server/db/mongoose");
const { Todo }     = require("./../server/models/todo");
const { User }     = require("./../server/models/user");

// by sending empty array it removes all the documents
// it did not return the object that was removed
// Todo.remove({}).then((res) => {
//   console.log(res);
// })

// delete one and return the deleted document
// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

Todo.findByIdAndRemove('58d5ed85fb3394de21d02a80').then((todo) => {
  console.log(todo);
})