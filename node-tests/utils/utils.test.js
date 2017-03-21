const expect = require("expect");
const utils = require("./utils");

describe('Utils', () => {

  describe('#add', () => {
    it('should add two numbers', () => {
      var res = utils.add(33, 11);

      // if(res !== 44) {
      //   throw new Error(`Expected 44, but got ${res}`);
      // }
      // change to 
      expect(res).toBe(44).toBeA('number');
    });

      // async testing
    it('should async add two numbers', (done) => {
      utils.asyncAdd(4, 3, (sum) => {
        expect(sum).toBe(7).toBeA('number');
        done();
      });
    })
  })
  
  describe("#square", () => {
    it('should square a number', () => {
      var res = utils.square(4);

      // if(res !== 16) {
      //   throw new Error(`Expected 16, but got ${res}`);
      // }
      // change to
      expect(res).toBe(16).toBeA('number');
    });

    it('should async square a number', (done) => {
      utils.asyncSquare(4, (squared) => {
        expect(squared).toBe(16).toBeA('number');
        done();
      });
    });
  });
});

it('should expect some values', () => {
  // expect(12).toNotBe(11);
  // expect({name: 'Andrew'}).toEqual({name: 'Andrew'});
  // expect([2,3,4]).toInclude(2);
});

it('should verify first and last names are set', () => {
  var res = utils.setName({ location: "Singapore", age: "27" }, "Mikael Airlangga");

  expect(res).toInclude({
    firstname: "Mikael",
    lastname: "Airlangga"
  });
});

