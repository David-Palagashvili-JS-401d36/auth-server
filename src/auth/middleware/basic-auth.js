'use strict'
// bring in binary-to-text encoding
const base64 = require('base-64');
// require our user model
const userModel = require('../models/user-model.js');
// followed class example for authentication
async function basicAuth(request, response, next) {
    // these are the strings from the authentication header
    let [authString, authType] = request.headers.authorization.split(' ');
    
    let [userName, passWord] = base64.decode(authString).split(':'); // takes in our auth string, decodes it, returns a big wierd string.
    
}