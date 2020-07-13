'use strict';
const express = require('express');

const auth = require('./middleware/basic.js');

const router = express.Router();

const UserModel = require('./models/users-model.js');

const User = new UserModel();

router.post('/signup', createUser);
router.post('/signin', auth, userSignIn);
router.get('/users', getUsers);

// NOTE to TA: I followed the class example --> https://github.com/codefellows/seattle-javascript-401d36/blob/master/class-12/review/auth-server/src/auth/router.js
async function createUser(request, response) {
    let userExists = await User.exists( {username: request.body.username} );
    if (userExists) {
        response.send('user already exists');
        return;
    }
    let password = await UserModel.hashPassword(request.body.password);
    let newUser = await User.create( {username: request.body.username, password: password} );
    if (newUser) {
        let token = UserModel.generateToken( {username: request.body.username} )
        response.cookie('token', token);
        response.header('token', token);
        response.send(token);
    } else {
        response.status(403).send('that user is invalid');
    }
};

async function userSignIn(request, response) {
    if (request.user) {
        let token = await UserModel.generateToken( {username: request.user.username} );
        response.cookie('token', token);
        response.header('token', token);
        response.send( {token, user: request.user} );
    } else {
        res.status(403).send('sign in was invalid');
    }
};

async function getUsers(request, response) {
    let userQuery = await User.get();
    response.send(userQuery);
};

module.exports = router;