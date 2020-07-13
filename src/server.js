'use strict';
// Bring in the middleware to be used by the server
const express = require('express');

//require router module just like in our last lab, except is lives in a different folder.
const authenticationRouter = require('./auth/router.js');

const bearerTest = require('./auth/extra-routes.js');

const app = express();

app.use(express.json());

app.use('/', authenticationRouter);
app.use('/', bearerTest);

// exports as object to be triggered instead of starting on its own.
module.exports = {
    server: app,
    start: (port) => {
        app.listen(port, () => {
            console.log('Our server is running on port: ' + port);
        });
    }
};