'use strict'
// bring in binary-to-text encoding
const base64 = require('base-64');

// require our user model
const userModel = require('../models/user-model.js');

// followed class example for authentication
async function basicAuth(request, response, next) {
    // these are the strings from the authorization header
    let [authString, authType] = request.headers.authorization.split(' ');
    let [userName, passWord] = base64.decode(authString).split(':'); // takes in our auth string, decodes it, returns a big wierd string.
    // Reads the encoded username and password from the Authentication header
    let user = await userModel.authenticateUser(userName, passWord);
    if (user) {
        request.user = user;
        next();
    } else {
        next('that is an Invalid login');
    }
    return 0;
};

module.exports = basicAuth;