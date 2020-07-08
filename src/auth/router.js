'use strict';

const express = require('express');
const auth = require('./middleware/basic.js');
const router = express.Router();
const UserModel = require('./models/users-model.js');
const User = new UserModel();

router.post('/signup', createUser);
router.post('/signin', auth, UserSignIn);
router.get('/users', getUsers);

async function createUser(request, response) {
    let userExists = await User.exists( {username: request.body.username} );
    if (userExists) {
        response.send('user already exists');
        return;
    }
    let newUser = await UserModel.hashPassword(request.body.password);
    let newUser = await User.create( {username: request.body.username, password: password} );
    if (newUser) {
        let token = UserModel.generateToken( {username: request.body.username} )
        // console.log(UserModel.generateToken({ username: request.body.username }));
        console.log(token);
        response.cookie('token', token);
        response.header('token', token);
        response.send('user was signed up');
    } else {
        response.status(403).send('that user is invalid');
    }
};

async function UserSignIn(request, response) {}

async function getUsers(request, response) {}