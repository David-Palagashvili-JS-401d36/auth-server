'use strict';

const UserModel = require('../models/user-model.js');
const User = new UserModel();

// TODO: Create a new middleware module called authorize.js in your auth module’s middleware folder. This middleware will need to do the following:

// Take note of the capability being identified by the route
// Note – this is a middleware call that takes a parameter, meaning your middleware method must be “curried”
// Read the value of the Bearer Token in the authorization header
// Invoke a method in the user model to check that the user’s role has the permission called for
// If the user has the capability, use next() to continue on to the actual route handler
// If not, the middleware should invoke the error handler by calling next() with an error