console.log("Starting App");

setTimeout(() => {
  console.log("inside of callback");
}, 2000);

setTimeout(() => {
  console.log("0 delay");
}, 0);

console.log("finishing up");