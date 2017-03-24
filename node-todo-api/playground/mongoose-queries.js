const { ObjectID } = require("mongodb");
// a little not if you forgotten
// its the same as 
// const mongoose = require("mongoose");
// const ObjectID = mongoose.ObjectID
const { mongoose } = require("./../server/db/mongoose");
const { Todo }     = require("./../server/models/todo");
const { User }     = require("./../server/models/user");

// var id = '58d52d79f9cc7204969c2311';

// if (!ObjectID.isValid(id)) {
//   console.log("ID invalid");
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log("todos", todos);
// })

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log("todo", todo);
// })

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log("ID not found");
//   }
//   console.log("todo by id", todo);  
// }).catch((e) => console.log(e));

var user_id = "58d533ae67f76208a20af8e5";

User.findById(user_id).then((user) => {
  if(!user) {
    return console.log("User not found");
  }
  console.log("User found", user);
}).catch((e) => console.log(e));