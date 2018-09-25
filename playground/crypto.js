const {SHA256} = require('crypto-js');


let message = 'i am user';

let hash = SHA256(message).toString();

console.log(hash);
