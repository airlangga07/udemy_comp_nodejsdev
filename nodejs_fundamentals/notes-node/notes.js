console.log("Starting notes.js");

const fs = require('fs');

var addNote = (title, body) => {
  var notes = [];
  var note  = {
    title: title, 
    body: body
  };

  try {
    var notesString = fs.readFileSync('notes-data.json');
    notes = JSON.parse(notesString);
  } catch (e) {

  }

  // ES 2015 or ES5 would do something like this
  //    var duplicateNotes = notes.filter(function(note) {
  //      if (note.title === title) {
  //        return true;
  //      }
  //      return false;
  //    });
  // 
  // ES 2016 or ES6 would do the arrow function like this
  //    var duplicateNotes = notes.filter((note) => {
  //       return note.title === title;
  //     });
  // But you can simplify if you only have one line of return call to be like this
  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
    console.log("Adding note", title, body);
  }
};

var getAll = () => {
  console.log("Getting all notes");
};

var getNote = (title) => {
  console.log("Reading note", title);
}

var removeNote = (title) => {
  console.log("Removing note", title);
}

module.exports = { 
  addNote, 
  getAll, 
  getNote,
  removeNote
};
