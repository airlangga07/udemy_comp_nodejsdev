// Method 1
// var square = (x) => {
//   var result = x * x;
//   return result;
// }

// method 2 
// var square = (x) => x * x;
// you can omit the brackets if only 1 arg passed in example
var square = x => x * x;

console.log(square(9));

var user = {
  name: "Elang",
  // on ES5, This syntax will return undefined on this.name because using the arrow function notation
  sayHi: () => {
    console.log(`Hi. I'm ${this.name}`)
  },
  // ES6 Syntax, this will correct and return as expected, this is using the normal without arrow
  sayHiAlt () {
    console.log(`Hi. I'm ${this.name}`)
  }
};

user.sayHi()