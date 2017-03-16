// var obj = {
//   name: 'Mikael'
// };

// var stringObj = JSON.stringify(obj);
// console.log(obj)
// console.log(typeof stringObj);
// console.log(stringObj);

// var personString = '{"name": "Mikael", "age": 27}';
// var person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person);

const fs = require('fs');

var originalNote = {
  title: "Some Title",
  body: "Some Body"
}

var originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('playground/notes.json', originalNoteString);

var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);