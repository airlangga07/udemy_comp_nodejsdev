const fs    = require('fs');
const _     = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

var titleOptions = {
  describe: "Title of your note",
  demand: true,
  alias: 't'
};

var bodyOptions = {
  describe: "The body of your note.",
  demand: true, 
  alias: 'b'
}

const argv = yargs
  .command('add', 'add a new note', { title: titleOptions, body: bodyOptions })
  .command('list', 'list all notes')
  .command('read', 'read a note', { title: titleOptions })
  .command('remove', 'remove a note by specifying the title', { title: titleOptions })
  .help()
  .argv;
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log("Note created");
    notes.logNote(note);
  } else {
    console.log("note taken")
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log("Reading Note");
    notes.logNote(note);
  } else {
    console.log("note not found.")
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = (noteRemoved) ? "Note was removed" : "Note not found."
  console.log(message)
} else {
  console.log('Command not found.');
}