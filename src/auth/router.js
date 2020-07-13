'use strict';
const express = require('express');

const auth = require('./middleware/basic.js');

const router = express.Router();

const UserModel = require('./models/user-model.js');

const User = new UserModel();

router.post('/signup', createUser);
router.post('/signin', auth, userSignIn);
router.get('/users', getUsers);

// NOTE to TA: I followed the class example --> https://github.com/codefellows/seattle-javascript-401d36/blob/master/class-12/review/auth-server/src/auth/router.js
async function createUser(request, response) {
    let userExists = await User.exists( {userName: request.body.userName} );
    if (userExists) {
        response.send('user already exists');
        return;
    }
    let passWord = await UserModel.passHash(request.body.passWord);
    let newUser = await User.create( {userName: request.body.userName, passWord: passWord} );
    if (newUser) {
        let token = UserModel.generateToken( {userName: request.body.userName} )
        response.cookie('token', token);
        response.header('token', token);
        response.send(token);
    } else {
        response.status(403).send('that user is invalid');
    }
};

async function userSignIn(request, response) {
    if (request.user) {
        let token = await UserModel.generateToken( {userName: request.user.userName} );
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