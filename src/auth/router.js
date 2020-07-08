'use strict';

const express = require('express');
const auth = require('./middleware/basic.js');
const router = express.Router();
const UserModel = require('./models/users-model.js');
const User = new UserModel();