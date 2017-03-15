console.log("Starting app.");

// add the FileSystem module
const fs = require('fs');

// add the Operating System info module
const os = require('os');

// get the user object
var user = os.userInfo();

// create a file and append text inside it, in here we use the user and get the username property and add it to the file
// Javascript es6 offers the template string where you can format your string and insert variables just like ruby, just use the `` 
fs.appendFile('greetings.txt', `Hello ${user.username}!`, function (err) {
  if (err) {
    console.log('Unable to write to file');
  }
});
