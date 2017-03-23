var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model("Todo", {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// var newTodo = new Todo({
//   text: "Something to do"
// });

// newTodo.save().then((doc) => {
//   console.log("Saved Todo", doc);
// }, (err) => {
//   console.log("Unable to save todo");
// })

var User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
})

var newUser = new User({
  email: "mikael@airlangga.com"
})

newUser.save().then((doc) => {
  console.log("Saved User", doc)
}, (err) => {
  console.log(err)
})