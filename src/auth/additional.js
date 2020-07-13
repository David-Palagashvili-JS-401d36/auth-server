'use strict';

// express middleware
const express = require('express');
const router = express.Router();

// bearer auth middleware
const bearer = require('./middleware/bearer-auth.js');

// instantiate user model
const UserModel = require('./models/user-model.js');
const User = new UserModel();

router.get('/secret', bearer, (req, res) => {
    res.send(req.user);
});

// TODO: wire up the following routes as a means of ensuring that our authorization system works well:

router.get('/read', bearer, permissions('read'), (req, res) => {

});

router.post('/add', bearer, permissions('create'), (req, res) => {
    
});

router.put('/change', bearer, permissions('update'), (req, res) => {
    
});

router.delete('/remove', bearer, permissions('delete'), (req, res) => {
    
});

module.exports = router;