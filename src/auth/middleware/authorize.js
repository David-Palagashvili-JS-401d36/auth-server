'use strict';
// Authorization Middleware Module

const UserModel = require('../models/user-model.js');
const User = new UserModel();

// This method will take note of the capability being identified by the route
const permissions = (capability) => async(request, response, next) => { // curried function to support a middleware call that takes a parameter (capability)
    let userDetails = await User.fetchUserByName(request.user.userName); // reads the value of the Bearer Token in the authorization header
    let user = User;

    user.createTempUser(userDetails);
    // console.log(user);
    // Invokes a method from the user model to check that the user’s role has the permission called for
    let accessGranted = await user.validatePermission(capability);
    if (accessGranted) { // If the user has the capability,
        next(); // use next() to continue on to the actual route handler
    } else { // If not,
        next('sorry, access denied!'); // invoke the error handler by calling next() with an error
    };
};
// export the module
module.exports = permissions;