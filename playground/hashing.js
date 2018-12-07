const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 12
};

var token = jwt.sign(data, '123abc'); //data and secret

console.log(token);

console.log("Decoded:", jwt.verify(token, '123abc'));