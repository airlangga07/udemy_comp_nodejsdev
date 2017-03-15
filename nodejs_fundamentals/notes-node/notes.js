console.log("Starting notes.js");

// anonymous function can be represented by arrow function which basically takes out the 'function' and add the => after the ()
module.exports.addNote = () => {
  console.log('addNote');
  return 'New note.';
};
