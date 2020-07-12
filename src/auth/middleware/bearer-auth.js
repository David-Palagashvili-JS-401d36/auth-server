'use strict';

const UserModel = require('../models/user-model.js');

// TODO: Using an async fn, set up the logic for bearer auth. 

// validate the token 
// export as module

async function bearerAuth(request, response, next) {
    if (!request.headers.authorization) { // Instant 401 if no auth headers are passed in.
        response.status(401).send('Woah there, we didn\'t get any authorization headers from you!');
    }
    let [authType, token] = request.headers.authorization.split(' '); // split the auth headers to extract token
};