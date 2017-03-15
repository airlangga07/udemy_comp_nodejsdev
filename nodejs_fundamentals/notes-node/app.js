console.log("Starting app.js");

// add the FileSystem module
const fs = require('fs');

// add the Operating System info module
const os = require('os');

// requiring lodash
const _ = require('lodash');

// add our built in file
const notes = require('./notes.js');

// using the lodash functions
// this one is checking wheter the supplied argument is string or not and return a bool
console.log(_.isString(true));
console.log(_.isString('Mikael'));

// this one return an array with no duplicates
var filteredArray = _.uniq(['elang', 'elang', 1, 2, 3, 4, 'elang', 2, 4, 5, 'test']);
console.log(filteredArray);

// retrieve the our built in functions
var res = notes.addNote();
console.log(res);
var add = notes.add(1, 2);
console.log(`Result: ${add}`);

// create a file and append text inside it, in here we use the user and get the username property and add it to the file
// Javascript es6 offers the template string where you can format your string and insert variables just like ruby, just use the `` 
// get the user object
var user = os.userInfo();
fs.appendFile('greetings.txt', `Hello ${user.username}! you are ${notes.age}.`, function (err) {
  if (err) {
    console.log('Unable to write to file');
  }
});
