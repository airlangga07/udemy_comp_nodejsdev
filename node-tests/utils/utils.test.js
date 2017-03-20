const expect = require("expect");
const utils = require("./utils");

it('should add two numbers', () => {
  var res = utils.add(33, 11);
  expect(res).toBe(44).toBeA('number');
});

it('should square a number', () => {
  var res = utils.square(4);
  expect(res).toBe(16).toBeA('number');
});

// it('should expect some values', () => {
  // expect(12).toNotBe(11);
  // expect({name: 'Andrew'}).toEqual({name: 'Andrew'});
  // expect([2,3,4]).toInclude(2);
// });

it('should verify first and last names are set', () => {
  var res = utils.setName({ location: "Singapore", age: "27" }, "Mikael Airlangga");

  expect(res).toInclude({
    firstname: "Mikael",
    lastname: "Airlangga"
  });
});