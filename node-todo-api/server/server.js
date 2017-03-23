var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model("Todo", {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

var newTodo = new Todo({
  text: "Feed the Cat",
  completed: true,
  completedAt: 123
});

newTodo.save().then((doc) => {
  console.log("Saved Todo", doc);
}, (err) => {
  console.log("Unable to save todo");
})