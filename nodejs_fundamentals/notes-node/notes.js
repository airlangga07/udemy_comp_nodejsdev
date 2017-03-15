console.log("Starting notes.js");

// anonymous function can be represented by arrow function which basically takes out the 'function' and add the => after the ()
module.exports.addNote = () => {
  console.log('addNote');
  return 'New note.';
};

// course challenge, add a function that adds two variables and return it
module.exports.add = (a, b) => {
  console.log(`retrieved value a: ${a} and retrieved value b: ${b}`)
  return a + b;
}
