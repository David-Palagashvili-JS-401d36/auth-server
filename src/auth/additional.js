'use strict';

// express middleware
const express = require('express');
const router = express.Router();

// bearer auth module
const bearer = require('./middleware/bearer-auth.js');

// instantiate user model
const UserModel = require('./models/user-model.js');
const User = new UserModel();

router.get('/secret', bearer, (req, res) => {
    res.send(req.user);
});

module.exports = router;