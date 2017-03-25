const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// USING BCRYPT
var password = '123abc!';

// generate hashed password
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$ZaK2eRkmAOIHUa.8ExSJ.uHcyAYxuDApZrNH4T2FcVxh4EJiXigOm';

// compare the password
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})

// USING JWT
// var data = {
//   id: 10
// }

// takes the object and signs it, hash and it returns the token value
// var token = jwt.sign(data, "123abc");
// console.log(token);

// takes that token and the secret, and make sure the data not manipulated
// var decodedToken = jwt.verify(token, "123abc");
// console.log(decodedToken);



// MANUAL HASH
// var message = "I am user number 3";
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// };

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// }

// try to intercept the data
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();

// if(resultHash === token.hash) {
//   console.log("data was not changed");
// } else {
//   console.log("data was changed do not proceed");
// }