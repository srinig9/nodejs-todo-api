const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    })
});

// var hashedPassword = "$2a$10$f2yhsvFHqwOwqOQiVq0r7.dILjAH4jajuVdktBMTsRZtN03gKJmea";

// bcrypt.compare(password, hashedPassword, (err, res) => {
//     console.log(res);
// })
// var data = {
//     id: 12
// };

// var token = jwt.sign(data, '123abc'); //data and secret

// console.log(token);

// console.log("Decoded:", jwt.verify(token, '123abc'));

module.exports={passwordHashing}