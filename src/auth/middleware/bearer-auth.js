'use strict';
// require user model for jwt functionality
const UserModel = require('../models/user-model.js');

async function bearerAuth(request, response, next) {
    if (!request.headers.authorization) { // Instant 401 if no auth headers are passed in.
        response.status(401).send('Woah there, we didn\'t get any authorization headers from you!');
    }
    let [authType, token] = request.headers.authorization.split(' '); // split the auth headers to extract token
    let validatedUser = await UserModel.validateToken(token); // validate the user by token

    if (validatedUser) {
        request.user = validatedUser;
        next();
    } else {
        next('token was invalid')
    }
};
// export as module
module.exports = bearerAuth;