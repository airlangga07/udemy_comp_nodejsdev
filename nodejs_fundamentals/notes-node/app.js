console.log("Starting app.js");

// add the FileSystem module
const fs = require('fs');

// add the Operating System info module
const os = require('os');

// get the user object
var user = os.userInfo();

// add our built in file
const notes = require('./notes.js');

// retrieve the functions
var res = notes.addNote();
console.log(res);

var add = notes.add(1, 2);
console.log(`Result: ${add}`);

// create a file and append text inside it, in here we use the user and get the username property and add it to the file
// Javascript es6 offers the template string where you can format your string and insert variables just like ruby, just use the `` 
// fs.appendFile('greetings.txt', `Hello ${user.username}! you are ${notes.age}.`, function (err) {
//   if (err) {
//     console.log('Unable to write to file');
//   }
// });
