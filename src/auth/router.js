'use strict';

const express = require('express');
const auth = require('./middleware/basic.js');
const router = express.Router();
const UserModel = require('./models/users-model.js');
const User = new UserModel();

router.post('/signup', newUser);
router.post('/signin', auth, UserSignIn);
router.get('/users', getUsers);

async function signUp(request, response) {}

async function UserSignIn(request, response) {}

async function getUsers(request, response) {}