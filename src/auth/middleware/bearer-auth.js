'use strict';

const UserModel = require('../models/users-model.js');

// TODO: Using an async fn, set up the logic for bearer auth. 
// Instant 401 if no auth headers are passed in.
// split the auth headers to extract auth type and token
// validate the token 
// export as module