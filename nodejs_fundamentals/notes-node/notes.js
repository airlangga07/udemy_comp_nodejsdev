console.log("Starting notes.js");

const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note  = {
    title: title, 
    body: body
  };

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
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  console.log("Getting all notes");
};

var getNote = (title) => {
  console.log("Reading note", title);
}

var removeNote = (title) => {
  // fetch notes
  var notes = fetchNotes();
  // filter notes removing the one with title of argument
  var resultsNote = notes.filter((note) => note.title !== title);
  // save new notes array
  saveNotes(resultsNote);

  return notes.length !== resultsNote.length;
}

module.exports = { 
  addNote, 
  getAll, 
  getNote,
  removeNote
};
