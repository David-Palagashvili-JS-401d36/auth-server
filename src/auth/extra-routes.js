'use strict';

// express middleware
const express = require('express');
const router = express.Router();

// bearer auth middleware
const bearer = require('./middleware/bearer-auth.js');

// Permissions for RBAC
const permissions = require('./middleware/authorize.js');

// instantiate user model
const UserModel = require('./models/user-model.js');
const User = new UserModel();

router.get('/secret', bearer, (req, res) => {
    res.send(req.user);
});

// The following routes are basically a means of ensuring that our authorization system works well:

router.get('/read', bearer, permissions('read'), (req, res) => {
    res.send('Route /read worked');
});

router.post('/add', bearer, permissions('create'), (req, res) => {
    res.send('Route /add worked');
});

router.put('/change', bearer, permissions('update'), (req, res) => {
    res.send('Route /change worked');
});

router.delete('/remove', bearer, permissions('delete'), (req, res) => {
    res.send('Route /remove worked');
});

module.exports = router;